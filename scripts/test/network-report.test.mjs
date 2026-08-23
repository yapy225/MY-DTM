// Tests unitaires de la logique de détection (pure, sans réseau). node --test, zéro dépendance.
// Verrouille : classement en tiers, debounce, désindexation même-URL, boucle d'efficacité, maillage.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detect } from '../network-report.mjs';
import { buildLinkingPlan } from '../lib/linking-plan.mjs';
import { buildSeoStatus } from '../lib/seo-status.mjs';
import { composeDigest, t2Section } from '../unified-digest.mjs';

const gsc = (o) => ({ property: 'sc-domain:x', total: 10, indexed: 5, indexedUrls: [], notIndexed: [], ...o });
const find = (arr, type, brand) => arr.find((x) => x.type === type && (!brand || x.brand === brand));

test('INDEXATION_LOW → tier 1, streak 1, baseline', () => {
  const now = { gsc: { a: gsc({ total: 10, indexed: 2, indexedUrls: ['u1', 'u2'], notIndexed: ['u3', 'u4', 'u5', 'u6', 'u7', 'u8'] }) }, ga4: {} };
  const x = find(detect(now, null), 'INDEXATION_LOW', 'a');
  assert.ok(x); assert.equal(x.tier, 1); assert.equal(x.streak, 1); assert.equal(x.baseline, 2);
});

test('indexation saine (>= seuil) → aucune anomalie', () => {
  const now = { gsc: { a: gsc({ total: 10, indexed: 8 }) }, ga4: {} };
  assert.equal(detect(now, null).length, 0);
});

test('DESINDEXATION 1er run → tier 0 (debounce, surveillance)', () => {
  const prev = { gsc: { a: gsc({ indexedUrls: ['a', 'b', 'c', 'd'] }) }, ga4: {}, anomalies: [] };
  const now = { gsc: { a: gsc({ indexedUrls: ['d'], notIndexed: ['a', 'b', 'c'] }) }, ga4: {} };
  const x = find(detect(now, prev), 'DESINDEXATION', 'a');
  assert.ok(x); assert.equal(x.tier, 0); assert.equal(x.confirmed, false); assert.equal(x.streak, 1);
});

test('DESINDEXATION persiste → tier 2 (confirmé, envoyé à l\'agent)', () => {
  const prev = { gsc: { a: gsc({ indexedUrls: ['a', 'b', 'c', 'd'] }) }, ga4: {}, anomalies: [{ brand: 'a', type: 'DESINDEXATION', streak: 1 }] };
  const now = { gsc: { a: gsc({ indexedUrls: ['d'], notIndexed: ['a', 'b', 'c'] }) }, ga4: {} };
  const x = find(detect(now, prev), 'DESINDEXATION', 'a');
  assert.equal(x.tier, 2); assert.equal(x.confirmed, true); assert.equal(x.streak, 2);
});

test('bruit : 1 seule URL basculée (< seuil) → pas de DESINDEXATION', () => {
  const prev = { gsc: { a: gsc({ indexedUrls: ['a', 'b', 'c'] }) }, ga4: {}, anomalies: [] };
  const now = { gsc: { a: gsc({ indexedUrls: ['b', 'c'], notIndexed: ['a'] }) }, ga4: {} };
  assert.equal(find(detect(now, prev), 'DESINDEXATION'), undefined);
});

test('efficacité : stagnation après 5 runs → INDEXATION_STAGNANTE T3 + stagnant', () => {
  const prev = { gsc: { a: gsc({ total: 10, indexed: 2 }) }, ga4: {}, anomalies: [{ brand: 'a', type: 'INDEXATION_LOW', streak: 4, baseline: 2 }] };
  const now = { gsc: { a: gsc({ total: 10, indexed: 2, indexedUrls: ['u1', 'u2'], notIndexed: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] }) }, ga4: {} };
  const anoms = detect(now, prev);
  const low = find(anoms, 'INDEXATION_LOW', 'a');
  assert.equal(low.streak, 5); assert.equal(low.stagnant, true);
  const stag = find(anoms, 'INDEXATION_STAGNANTE', 'a');
  assert.ok(stag); assert.equal(stag.tier, 3);
});

test('efficacité : progrès (gain réel) → pas de stagnation', () => {
  const prev = { gsc: { a: gsc({ total: 20, indexed: 2 }) }, ga4: {}, anomalies: [{ brand: 'a', type: 'INDEXATION_LOW', streak: 4, baseline: 2 }] };
  const now = { gsc: { a: gsc({ total: 20, indexed: 4, indexedUrls: ['u1', 'u2', 'u3', 'u4'], notIndexed: [] }) }, ga4: {} };
  const anoms = detect(now, prev);
  assert.equal(find(anoms, 'INDEXATION_LOW', 'a').stagnant, false);
  assert.equal(find(anoms, 'INDEXATION_STAGNANTE'), undefined);
});

test('CHUTE_AUDIENCE : debounce tier 0 puis tier 3', () => {
  const now = { gsc: {}, ga4: { a: { status: 'OK', sessions: 100 } } };
  const prev1 = { gsc: {}, ga4: { a: { status: 'OK', sessions: 300 } }, anomalies: [] };
  assert.equal(find(detect(now, prev1), 'CHUTE_AUDIENCE', 'a').tier, 0);
  const prev2 = { gsc: {}, ga4: { a: { status: 'OK', sessions: 300 } }, anomalies: [{ brand: 'a', type: 'CHUTE_AUDIENCE', streak: 1 }] };
  assert.equal(find(detect(now, prev2), 'CHUTE_AUDIENCE', 'a').tier, 3);
});

test('maillage : cluster → 3 frères, ancres variées, pas de cluster étranger', () => {
  const map = { brands: {
    me: { domain: 'me.fr', cluster: 'c', repo: 'o/me' },
    s1: { domain: 's1.fr', cluster: 'c', repo: 'o/s1' },
    s2: { domain: 's2.fr', cluster: 'c', repo: 'o/s2' },
    s3: { domain: 's3.fr', cluster: 'c', repo: 'o/s3' },
    other: { domain: 'o.fr', cluster: 'z', repo: 'o/o' },
  } };
  const p = buildLinkingPlan('me', map, { max: 3 });
  assert.equal(p.targets.length, 3);
  assert.ok(p.targets.every((t) => t.to_domain === 'me.fr'));
  assert.equal(new Set(p.targets.map((t) => t.anchor_suggestion)).size, 3);         // ancres variées (anti-PBN)
  assert.ok(!p.targets.some((t) => t.from_domain === 'o.fr'));                       // jamais un cluster différent
});

test('maillage : site isolé → 0 cible + conseil autorité externe', () => {
  const map = { brands: { me: { domain: 'me.fr', cluster: 'solo', repo: 'o/me' } } };
  const p = buildLinkingPlan('me', map);
  assert.equal(p.targets.length, 0);
  assert.match(p.note, /EXTERNE/i);
});

test('seo_status@v1 : seuls les action_required (tier>=2) deviennent des events', () => {
  const report = { generatedAt: '2026-08-23T00:00:00Z',
    gsc: { a: { property: 'sc-domain:a.fr' } }, ga4: {},
    remediation: [{ ok: true }, { ok: false }],
    anomalies: [
      { brand: 'a', type: 'INDEXATION_LOW', tier: 1, severity: 'P1', streak: 1 },          // auto-fixé → exclu
      { brand: 'a', type: 'DESINDEXATION', tier: 0, severity: 'P1', streak: 1 },            // surveillance → exclu
      { brand: 'a', type: 'DESINDEXATION', tier: 2, severity: 'P1', streak: 2, confirmed: true }, // inclus
      { brand: 'a', type: 'INDEXATION_STAGNANTE', tier: 3, severity: 'P1', streak: 5 },     // inclus
    ] };
  const s = buildSeoStatus(report);
  assert.equal(s.contract_version, 'seo_status@v1');
  assert.equal(s.events.length, 2);
  assert.ok(s.events.every((e) => e.action_required === true));
  const des = s.events.find((e) => e.event_type === 'DESINDEXATION');
  assert.equal(des.occurrence_count, 2); assert.equal(des.novelty, 'RECURRING'); assert.equal(des.brand_id, 'a');
  assert.equal(s.coverage.auto_remediated, 1); assert.equal(s.coverage.gsc_properties, 1);
});

test('digest : rapport absent → dead-man\'s switch (alerte panne)', () => {
  const d = composeDigest(null, null, { isHeartbeat: false });
  assert.equal(d.send, true); assert.match(d.subject, /ABSENT/); assert.match(d.text, /PANNE/i);
});

test('digest : réseau sain hors battement → silencieux', () => {
  const report = { generatedAt: 'x', gsc: { a: {} }, ga4: {}, anomalies: [], remediation: [] };
  assert.equal(composeDigest(report, null, { isHeartbeat: false }).send, false);
});

test('digest : réseau sain + jour de battement → envoi (💓)', () => {
  const report = { generatedAt: 'x', gsc: { a: {} }, ga4: {}, anomalies: [], remediation: [] };
  const d = composeDigest(report, null, { isHeartbeat: true });
  assert.equal(d.send, true); assert.match(d.subject, /battement/);
});

test('digest : anomalies + activité T2 → envoi + section T2', () => {
  const report = { generatedAt: 'x', gsc: { a: {} }, ga4: {},
    anomalies: [{ brand: 'a', type: 'DESINDEXATION', tier: 2 }], remediation: [{ ok: true, action: 'resubmit_sitemap', brand: 'a' }] };
  const t2 = { traite: [{ brand: 'a', verdict: 'FIX_PR', pr: 'url' }], no_code_cause: [{ brand: 'b' }] };
  const d = composeDigest(report, t2, { isHeartbeat: false });
  assert.equal(d.send, true);
  assert.match(d.text, /AGENT T2/); assert.match(d.text, /FIX_PR/); assert.match(d.text, /faux positifs/);
});

test('t2Section : null → mention explicite', () => {
  assert.match(t2Section(null), /pas de résultat/i);
});
