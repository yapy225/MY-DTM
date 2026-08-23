// Émet le contrat GOUVERNÉ `seo_status@v1` (owner mydtm-master ; consommé par seo-control-plane
// via SEO_STATUS_FILE → Founder Brief unifié). But : le SEO rejoint finance/mail/crons dans UN
// seul read-model, au lieu d'un canal e-mail parallèle (dérive de gouvernance dénoncée §18/§13).
// Ne projette QUE les événements action_required (tier >= 2) ; NO_DATA/STALE jamais fabriqués.
export const SEO_STATUS_VERSION = 'seo_status@v1';

export function buildSeoStatus(report) {
  const events = (report.anomalies || [])
    .filter((x) => x.tier >= 2)                          // action_required uniquement (T2/T3)
    .map((x) => ({
      event_id: `seo:${x.brand}:${x.type}`,
      event_type: x.type,
      severity: x.severity || 'P1',
      action_required: true,
      brand_id: x.brand,
      business_object_ref: report.gsc?.[x.brand]?.property || x.brand,
      occurrence_count: x.streak || 1,
      novelty: (x.streak || 1) === 1 ? 'NEW' : 'RECURRING',
      state: x.confirmed === false ? 'WATCH' : 'CONFIRMED',
    }));
  return {
    contract_version: SEO_STATUS_VERSION,
    last_run_at: report.generatedAt,
    events,
    coverage: {
      gsc_properties: Object.keys(report.gsc || {}).length,
      ga4_with_data: Object.values(report.ga4 || {}).filter((x) => x.status === 'OK').length,
      auto_remediated: (report.remediation || []).filter((r) => r.ok).length,
    },
  };
}
