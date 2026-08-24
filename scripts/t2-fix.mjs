// AGENT T2 DÉTERMINISTE (GitHub Actions, PAS un LLM) — fiable, PEUT pousser.
// Lit les anomalies tier-2 (DESINDEXATION) de reports/network-report.json, route via
// network-map.json, clone chaque repo cible (PAT), diagnostique la cause CODE par des
// checks déterministes, et :
//   - robots.txt « Disallow: / » (bloque tout le site) = cause claire + fix SÛR → PR
//     (auto-merge si le repo a une CI / ci:true), sinon PR + clic ;
//   - autre indice (noindex meta / next) = diagnostic → ISSUE (l'humain juge l'intention) ;
//   - rien = NO_CODE_CAUSE (faux positif d'inspection).
// Écrit reports/t2-status.json (lu par le digest). Nécessite GH_TOKEN (PAT) + gh auth setup-git.
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const sh = (cmd, opts = {}) => { try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts }).trim(); } catch { return null; } };

function diagnose(dir) {
  const f = [];
  for (const p of ['robots.txt', 'public/robots.txt', 'static/robots.txt']) {
    const fp = `${dir}/${p}`;
    if (fs.existsSync(fp) && /^\s*Disallow:\s*\/\s*$/im.test(fs.readFileSync(fp, 'utf8'))) f.push({ type: 'ROBOTS_BLOCK_ALL', file: p });
  }
  const meta = sh(`grep -rliE '<meta[^>]+name=["'\\'']robots["'\\''][^>]*noindex' ${dir} --include='*.html' 2>/dev/null`);
  if (meta) f.push({ type: 'META_NOINDEX', files: meta.split('\n').slice(0, 5) });
  const next = sh(`grep -rlE 'robots:[[:space:]]*\\{[^}]*index:[[:space:]]*false' ${dir} --include='*.ts' --include='*.tsx' --include='*.js' 2>/dev/null`);
  if (next) f.push({ type: 'NEXT_NOINDEX', files: next.split('\n').slice(0, 5) });
  return f;
}

// Fix haute-confiance : neutralise « Disallow: / ». Retourne l'URL de PR ou null.
function openRobotsFixPr(dir, b, brand, finding) {
  const fp = `${dir}/${finding.file}`;
  fs.writeFileSync(fp, fs.readFileSync(fp, 'utf8').replace(/^(\s*)Disallow:\s*\/\s*$/im, '$1# Disallow: /   # retiré par T2 : bloquait toute l\'indexation'));
  const branch = `fix/seo-robots-${brand}`;
  const g = (c) => sh(c, { cwd: dir });
  g(`git checkout -B ${branch}`);
  g(`git add ${finding.file}`);
  g(`git -c user.name=t2-bot -c user.email=actions@github.com commit -m "fix(seo): robots.txt ne bloque plus tout le site (${finding.file})"`);
  if (g(`git push -u origin ${branch} --force-with-lease`) === null) return null;
  const pr = g(`gh pr create --head ${branch} --title "fix(seo): robots.txt ne bloque plus tout le site" --body "T2 a détecté \\\`Disallow: /\\\` dans ${finding.file} (bloque l'indexation du site entier). Neutralisé. Après merge : relancer gsc:report."`);
  if (pr && b.ci) g(`gh pr merge --auto --squash ${branch}`);   // auto-merge si CI (Next) ; sinon la PR attend un humain
  return pr;
}

function openIssue(repo, brand, findings) {
  const body = `T2 (déterministe) a détecté une désindexation avec un indice de cause CODE sur ${brand} :\\n\\n` +
    findings.map((f) => `- ${f.type}${f.files ? ` : ${f.files.join(', ')}` : ''}`).join('\\n') +
    `\\n\\n⚠️ Intention à juger par un humain (un noindex peut être volontaire). Si erroné : le retirer puis relancer gsc:report.`;
  return sh(`gh issue create --repo ${repo} --title "[SEO] désindexation ${brand} — cause code à vérifier" --body "${body}"`);
}

const report = JSON.parse(fs.readFileSync('reports/network-report.json', 'utf8'));
const map = JSON.parse(fs.readFileSync('scripts/network-map.json', 'utf8'));
const tier2 = (report.anomalies || []).filter((a) => a.tier === 2 && a.type === 'DESINDEXATION');
const result = { generatedAt: new Date().toISOString(), traite: [], no_code_cause: [], escalade_humain: [], ignore_hors_carte: [] };

for (const a of tier2) {
  const b = map.brands?.[a.brand];
  if (!b) { result.ignore_hors_carte.push({ brand: a.brand }); continue; }
  const dir = `/tmp/t2-${a.brand}`;
  sh(`rm -rf ${dir}`);
  if (sh(`gh repo clone ${b.repo} ${dir} -- --depth 1`) === null) { result.escalade_humain.push({ brand: a.brand, reason: 'CLONE_FAILED' }); continue; }
  const findings = diagnose(dir);
  if (!findings.length) { result.no_code_cause.push({ brand: a.brand, repo: b.repo }); continue; }
  const robots = findings.find((f) => f.type === 'ROBOTS_BLOCK_ALL');
  if (robots) {
    const pr = openRobotsFixPr(dir, b, a.brand, robots);
    result.traite.push({ brand: a.brand, repo: b.repo, verdict: pr ? 'FIX_PR' : 'PR_FAILED', pr, auto_merge_arme: !!(pr && b.ci) });
  } else {
    const issue = openIssue(b.repo, a.brand, findings);
    result.traite.push({ brand: a.brand, repo: b.repo, verdict: 'ISSUE_OPENED', pr: issue, findings: findings.map((f) => f.type) });
  }
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/t2-status.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
