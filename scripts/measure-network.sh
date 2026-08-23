#!/usr/bin/env bash
# Orchestrateur de MESURE du réseau (READ-ONLY, observation only — ATTENTION ≠ EXECUTION).
# Enchaîne toute la chaîne : indexation GSC (par site) → audience GA4 (réseau) → seo_status@v1.
#
# Usage : bash scripts/measure-network.sh
# Prérequis : clé GSC locale (~/Library/Application Support/yapia-seo/gsc-key.json),
#   APIs GA4 activées (projet dreamteamafrica). N'écrit que des rapports locaux ;
#   n'exécute AUCUNE action, ne pousse rien, ne modifie aucun site.
#
# NB planification : à lancer manuellement pour l'instant (données GA4 = NO_DATA ~3-4 j
# après déploiement). Auto-cron plus tard, au bon endroit (pas de launchd sur Documents
# — TCC ; doctrine « Mac = rien »).
set -uo pipefail

PROJECTS="${PROJECTS_DIR:-$HOME/Documents/Projets}"
export GSC_KEY_FILE="${GSC_KEY_FILE:-$HOME/Library/Application Support/yapia-seo/gsc-key.json}"
ok=0; ko=0

echo "== 1) Indexation GSC (par site) =="
for d in "$PROJECTS"/*/; do
  pj="$d/package.json"
  [ -f "$pj" ] || continue
  grep -q '"gsc:report"' "$pj" 2>/dev/null || continue
  name=$(basename "$d")
  if (cd "$d" && npm run --silent gsc:report >/dev/null 2>&1); then
    echo "   ✅ $name"; ok=$((ok+1))
  else
    echo "   ⛔ $name (clé/quota/accès ?)"; ko=$((ko+1))
  fi
done

echo "== 2) Audience GA4 (réseau) =="
if (cd "$PROJECTS/my-dtm" && npm run --silent ga4:report >/dev/null 2>&1); then
  echo "   ✅ ga4-report.json"
else
  echo "   ⛔ GA4 (API activée ? SA Lecteur ?)"
fi

echo "== 3) seo_status@v1 (Founder Brief) =="
OUT="$PROJECTS/mon-ia/seo-status/seo_status.json"
EMIT="$PROJECTS/mon-ia/seo-status/emit-seo-status.mjs"
if [ -f "$EMIT" ]; then
  mkdir -p "$(dirname "$OUT")"
  if (cd "$PROJECTS/mon-ia" && node seo-status/emit-seo-status.mjs > "$OUT" 2>/dev/null); then
    n=$(node -e "try{console.log(JSON.parse(require('fs').readFileSync('$OUT','utf8')).events.length)}catch(e){console.log('?')}")
    echo "   ✅ $OUT · anomalies=$n"
  else
    echo "   ⛔ emit-seo-status"
  fi
else
  br=$(cd "$PROJECTS/mon-ia" && git branch --show-current 2>/dev/null)
  echo "   ⏭️  émetteur absent du working tree mon-ia (branche '$br') — il est sur mon-ia 'main'."
  echo "      → passe mon-ia sur main (ou merge le WIP) pour générer seo_status.json."
fi

echo ""
echo "Mesure réseau terminée · GSC ok=$ok ko=$ko"
echo "Founder Brief : SEO_STATUS_FILE=$OUT (+ flag ON) pour consommer le statut."
