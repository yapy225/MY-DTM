// PASSE ON-PAGE T2 (déterministe, GitHub Actions) — étend le self-healing à la dette on-page.
// Complète scripts/t2-fix.mjs (qui ne traite QUE la désindexation robots). Ici : conformité GEO/§Média.
//
// Pour chaque marque de network-map.json :
//   1) GET https://<domain>/llms.txt (live). 200 = conforme (idempotent, aucun clone).
//      404/absent + onpage≠false → clone repo → crée le fichier au bon chemin → PR.
//      Auto-merge SI ci===true (Option A fondateur : jamais d'auto-merge sur statique). Sinon PR + clic.
//   2) GET homepage → audit max-image-preview + sameAs → REPORTÉ (jamais auto-fix : fragile / données absentes).
// Écrit reports/t2-onpage-status.json (lu par le digest / le fondateur). Nécessite GH_TOKEN (PAT) + gh auth setup-git.
//
// Sûreté : l'auto-merge (zéro humain) ne touche QUE les repos Next ci:true, où public/llms.txt est
// servi à coup sûr à la racine. Tout le reste = PR relue par un humain (Option A). `THE BOT NEVER LIES`.
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { buildLlmsTxt, auditHtml, planLlmsAction } from './lib/onpage-fixers.mjs';

const sh = (cmd, opts = {}) => { try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts }).trim(); } catch { return null; } };
const httpStatus = async (url) => { try { return (await fetch(url, { redirect: 'manual' })).status; } catch { return 0; } };
const httpText = async (url) => { try { const r = await fetch(url); return r.ok ? await r.text() : null; } catch { return null; } };

// Crée public/llms.txt (ou llms.txt) sur une branche, pousse, ouvre la PR. Auto-merge si autorisé.
// Idempotent : si le fichier existe déjà dans le repo (pas encore déployé) ou si une PR est ouverte → skip.
function openLlmsPr(dir, brand, key, path, autoMerge) {
  const fp = `${dir}/${path}`;
  if (fs.existsSync(fp)) return { verdict: 'ALREADY_IN_REPO', note: 'fichier présent, pas encore déployé' };
  const branch = `fix/seo-onpage-llms-${key}`;
  const g = (c) => sh(c, { cwd: dir });
  if (g(`gh pr list --head ${branch} --state open --json number --jq '.[0].number'`)) return { verdict: 'PR_ALREADY_OPEN' };
  fs.mkdirSync(fp.slice(0, fp.lastIndexOf('/')), { recursive: true });
  fs.writeFileSync(fp, buildLlmsTxt(brand.domain));
  g(`git checkout -B ${branch}`);
  g(`git add ${path}`);
  g(`git -c user.name=t2-bot -c user.email=actions@github.com commit -m "feat(seo): ajoute ${path} (découvrabilité IA — GEO/AEO)"`);
  if (g(`git push -u origin ${branch} --force-with-lease`) === null) return { verdict: 'PUSH_FAILED' };
  const pr = g(`gh pr create --head ${branch} --title "feat(seo): llms.txt (découvrabilité IA)" --body "Passe on-page T2 : \\\`${path}\\\` était absent (GET /llms.txt ≠ 200). Fichier minimal honnête (accueil + sitemap), à enrichir. §GEO/AEO. ${autoMerge ? 'Auto-merge armé (Next ci:true).' : 'PR + relecture humaine (Option A statique/sensible).'}"`);
  if (pr && autoMerge) g(`gh pr merge --auto --squash ${branch}`);
  return { verdict: pr ? 'FIX_PR' : 'PR_FAILED', pr, auto_merge_arme: !!(pr && autoMerge) };
}

const map = JSON.parse(fs.readFileSync('scripts/network-map.json', 'utf8'));
const result = { generatedAt: new Date().toISOString(), llms_fixed: [], llms_pr_open: [], compliant: [], skipped: [], onpage_gaps: [], errors: [] };

for (const [key, brand] of Object.entries(map.brands || {})) {
  const domain = brand.domain;
  try {
    // 2) audit homepage (report only) — fait toujours, indépendant de llms.txt.
    const html = await httpText(`https://${domain}/`);
    if (html) {
      const { hasMaxImagePreview, hasSameAs } = auditHtml(html);
      if (!hasMaxImagePreview || !hasSameAs) {
        result.onpage_gaps.push({ brand: key, domain, maxImagePreview: hasMaxImagePreview, sameAs: hasSameAs,
          note: 'DÉTECTÉ, non auto-fixé (max-image-preview=fragile par stack ; sameAs=exige vraies URLs sociales)' });
      }
    }
    // 1) llms.txt
    const status = await httpStatus(`https://${domain}/llms.txt`);
    const plan = planLlmsAction(brand, status);
    if (plan.verdict === 'COMPLIANT') { result.compliant.push(key); continue; }
    if (plan.verdict === 'SKIP') { result.skipped.push({ brand: key, reason: plan.reason }); continue; }
    const dir = `/tmp/t2op-${key}`;
    sh(`rm -rf ${dir}`);
    if (sh(`gh repo clone ${brand.repo} ${dir} -- --depth 1`) === null) { result.errors.push({ brand: key, reason: 'CLONE_FAILED' }); continue; }
    const r = openLlmsPr(dir, brand, key, plan.path, plan.autoMerge);
    if (r.verdict === 'FIX_PR') (r.auto_merge_arme ? result.llms_fixed : result.llms_pr_open).push({ brand: key, ...r });
    else result.skipped.push({ brand: key, verdict: r.verdict, ...r });
  } catch (e) { result.errors.push({ brand: key, reason: e.message }); }
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/t2-onpage-status.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
