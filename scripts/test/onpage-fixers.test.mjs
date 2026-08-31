// Tests des fixers on-page PURS (node:test, 0 dépendance). `npm run test:measure`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { llmsTxtPath, buildLlmsTxt, auditHtml, planLlmsAction } from '../lib/onpage-fixers.mjs';

test('llmsTxtPath : public/ pour Next, racine pour statique', () => {
  assert.equal(llmsTxtPath('next'), 'public/llms.txt');
  assert.equal(llmsTxtPath('static'), 'llms.txt');
  assert.equal(llmsTxtPath(undefined), 'llms.txt');
});

test('buildLlmsTxt : honnête (accueil + sitemap réels), aucune donnée fabriquée', () => {
  const out = buildLlmsTxt('exemple.fr');
  assert.match(out, /^# exemple\.fr$/m);
  assert.match(out, /https:\/\/exemple\.fr\//);
  assert.match(out, /https:\/\/exemple\.fr\/sitemap\.xml/);
  // pas de description inventée
  assert.doesNotMatch(out, /lorem|placeholder|TODO/i);
});

test('auditHtml : détecte max-image-preview:large', () => {
  assert.equal(auditHtml('<meta name="robots" content="index, max-image-preview:large">').hasMaxImagePreview, true);
  assert.equal(auditHtml('<meta name="robots" content="max-image-preview : large">').hasMaxImagePreview, true);
  assert.equal(auditHtml('<meta name="robots" content="index, follow">').hasMaxImagePreview, false);
});

test('auditHtml : détecte sameAs dans un JSON-LD', () => {
  assert.equal(auditHtml('{"@type":"Organization","sameAs":["https://fb.com/x"]}').hasSameAs, true);
  assert.equal(auditHtml('<script>{"@type":"Organization"}</script>').hasSameAs, false);
});

test('auditHtml : entrée vide/nulle ne casse pas', () => {
  assert.deepEqual(auditHtml(null), { hasMaxImagePreview: false, hasSameAs: false });
  assert.deepEqual(auditHtml(''), { hasMaxImagePreview: false, hasSameAs: false });
});

test('planLlmsAction : 200 = COMPLIANT (idempotent)', () => {
  assert.equal(planLlmsAction({ stack: 'next', ci: true }, 200).verdict, 'COMPLIANT');
});

test('planLlmsAction : onpage:false = SKIP (monorepo/sensible exclu)', () => {
  const p = planLlmsAction({ stack: 'next', ci: true, onpage: false }, 404);
  assert.equal(p.verdict, 'SKIP');
});

test('planLlmsAction : 404 sur Next ci:true = FIX + autoMerge', () => {
  const p = planLlmsAction({ stack: 'next', ci: true }, 404);
  assert.equal(p.verdict, 'FIX');
  assert.equal(p.path, 'public/llms.txt');
  assert.equal(p.autoMerge, true);
});

test('planLlmsAction : 404 sur statique ci:false = FIX SANS autoMerge (Option A)', () => {
  const p = planLlmsAction({ stack: 'static', ci: false }, 404);
  assert.equal(p.verdict, 'FIX');
  assert.equal(p.path, 'llms.txt');
  assert.equal(p.autoMerge, false);
});

test('planLlmsAction : statut inconnu (0) traité comme manquant → FIX', () => {
  assert.equal(planLlmsAction({ stack: 'static', ci: false }, 0).verdict, 'FIX');
});
