# Cluster SEO — Facturation électronique (My-DTM)

> Plan d'attaque du cluster « facturation électronique » sur my-dtm.fr.
> Source mots-clés : `ubersuggest facturaction_electronique.csv` (406 KW).
> Établi le 2026-09-02. Fenêtre de tir : sept. 2026 → sept. 2027 (pic de recherche
> lié aux 2 échéances légales).

---

## 1. Stratégie en une page

**Objectif** : capter la vague de recherche « facturation électronique » pour
alimenter le tunnel My-DTM (guide payant → accompagnement → prestation
de digitalisation compta/facturation).

**3 partis pris non négociables :**

1. **On ne vend pas de l'information, on vend une transformation.** Le sujet est
   sur-couvert gratuitement (DGFiP, service-public.fr, Pennylane, Sage…). Le
   contenu gratuit (pilier + spokes) capte le trafic ; le payant est un **kit
   « done-for-you » / accompagnement conformité**, pas un cours.
2. **On n'attaque pas les têtes de requête frontalement.** `facturation
   électronique` (40 500 vol., diff 43) est imprenable pour un domaine jeune.
   On gagne sur les **personas** (diff 14-36) et les **outils interactifs**.
3. **Le vrai revenu = le lead vers l'accompagnement**, pas le PDF à 9-29 €. Le
   guide est un *tripwire*.

**Différenciation obligatoire** (sinon on perd contre les incumbents) :
- angle **persona ultra-précis** (auto-entrepreneur, association, SCI, avocat…) ;
- **outils interactifs** (simulateur « ma date », comparateur de plateformes) =
  link magnets pour compenser l'autorité de domaine faible ;
- **E-E-A-T / YMYL** : sujet fiscal → sources citées (BOFiP, DGFiP), date de MAJ
  visible, ton d'expert. Bonus : documenter notre propre mise en conformité
  (My KMK / Dream Team) = étude de cas incopiable.

---

## 2. Architecture hub & spoke

```
PILIER (guide monétisé) /guides/facturation-electronique-obligatoire
│  ← tête evergreen : obligatoire · c'est quoi · pour qui · réforme · en france
│  monétisation : accompagnement conformité (cal) + [ebook kit à venir]
│
├─ SPOKES INFO (blog, gratuits) → captent le volume, renvoient au pilier
│   ├─ calendrier & dates            (calendrier 590/16⚡, date 1600/47, 2027 260)
│   ├─ 2026 : ce qui change          (2026 8100/36 ⭐)
│   ├─ pour qui / qui est concerné   (obligatoire pour qui 170, suis-je concerné)
│   ├─ plateforme agréée (PA/PDP)    (pa 320/24, plateforme 210, annuaire 170)
│   ├─ formats Factur-X / UBL / XML  (ubl, xml, factur-x)
│   ├─ e-reporting                   (e reporting 170/24)
│   ├─ Chorus Pro (B2G)              (chorus pro 90)
│   ├─ nouvelles mentions / SIREN    (mentions obligatoires 20, siren ou siret)
│   ├─ sanctions / amende            (amende, sanction)
│   └─ gratuit / logiciel gratuit    (gratuit 6600/38 ⭐, logiciel 480)  ← top magnet
│
├─ SPOKES PERSONA (blog → CTA guide/accompagnement)  ⭐ LE FILON
│   ├─ auto-entrepreneur / micro     (6600/36 ⭐⭐⭐ + sans tva + 2026 a.e. 480)
│   ├─ association                    (880/15 ⚡)                    ← QUICK WIN
│   ├─ SCI / LMNP                     (sci 480/14 ⚡ + lmnp + meublé) ← QUICK WIN
│   ├─ TPE / PME                      (tpe 390/26, pme 260/47)
│   ├─ professions libérales santé   (médecin, kiné, infirmière, ostéo)
│   ├─ avocats                        (avocats 210/33 + barreau)
│   └─ [batch 2] restaurant · artiste-auteur · VTC/taxi · BTP · agriculteur
│
├─ SPOKE COMPARATIF (blog, intent commercial 💰)
│   └─ comparatif plateformes         (pennylane 210/14, sage 210/20, odoo 210/9,
│                                       qonto, indy, henrri, tiime, abby, dolibarr)
│
└─ OUTILS INTERACTIFS (différenciation, phase C)
    ├─ Simulateur « Suis-je concerné + quelle est MA date ? »
    └─ Comparateur de Plateformes Agréées
```

---

## 3. Mapping mots-clés → pages (inventaire cible)

Type : `G` = guide (monétisé), `B` = blog (gratuit), `T` = outil.
Vague : ordre de publication recommandé (voir §6).

| # | Slug | Type | KW principal (vol / diff) | KW secondaires captés | Vague |
|---|------|------|---------------------------|-----------------------|-------|
| 0 | `facturation-electronique-obligatoire` | G | obligatoire (4400/43) | obligation, c'est quoi, pour qui, réforme, en france, loi, def | **1** |
| 1 | `facturation-electronique-association` | B | association (880/**15**⚡) | association 1901, pour les associations, assujettie TVA | **1** |
| 2 | `facturation-electronique-calendrier-dates` | B | calendrier (590/**16**⚡) | date, 2027, septembre 2026, report, reportée, à partir de quand | **1** |
| 3 | `facturation-electronique-sci-lmnp` | B | sci (480/**14**⚡) | sci familiale, sci ir, lmnp, location meublée, bailleur | **1** |
| 4 | `facturation-electronique-auto-entrepreneur` | B→G | auto-entrepreneur (6600/36⭐) | micro-entreprise, sans tva, 2026 a.e. (480), indépendant | **2** |
| 5 | `facturation-electronique-gratuite-logiciel` | B | gratuit (6600/38⭐) | logiciel (480), logiciel gratuit (110), plateforme gratuite (210) | **2** |
| 6 | `plateforme-agreee-facturation-electronique` | B | pa (320/24) | plateforme (210), quelle plateforme choisir, liste, annuaire (170) | **2** |
| 7 | `facturation-electronique-2026` | B | 2026 (8100/36⭐) | 2026 c'est quoi, france 2026, 2026 pour qui, 2026 gratuit | **2** |
| 8 | `comparatif-plateformes-facturation-electronique` | B | quelle plateforme choisir | pennylane, sage, odoo, qonto, indy, henrri, tiime, abby, dolibarr | **3** |
| 9 | `facturation-electronique-tpe-pme` | B | tpe (390/26) | pme (260/47), petite entreprise, entreprise | **3** |
| 10 | `factur-x-ubl-formats-facture-electronique` | B | factur-x / ubl | xml, format xml, format ubl, norme afnor | **3** |
| 11 | `e-reporting-facturation-electronique` | B | e reporting (170/24) | reporting, transmission des données, B2C, international | **3** |
| 12 | `nouvelles-mentions-obligatoires-facture-electronique` | B | mentions obligatoires (20) | siren ou siret, code routage, nouvelles mentions | **3** |
| 13 | `facturation-electronique-professions-liberales` | B | (santé) | médecin, kiné, infirmière libérale, ostéopathe, orthophoniste, BNC | **4** |
| 14 | `facturation-electronique-avocats` | B | avocats (210/33) | barreau de paris, expert judiciaire, kleos/xelya | **4** |
| 15 | `chorus-pro-facturation-electronique` | B | chorus pro (90) | chorus, B2G, marchés publics | **4** |
| 16 | `facturation-electronique-sanctions-amende` | B | amende / sanction | refus, tolérance, contrôle | **4** |
| 17 | `facturation-electronique-simulateur` | T | (suis-je concerné) | à partir de quand, quelle date, pour qui, taille entreprise | **C** |
| 18 | `comparateur-plateformes-agreees` | T | (liste plateformes) | plateforme agréée par l'état, annuaire | **C** |

> Les ~330 KW à volume 0 du CSV sont de la **longue traîne de variantes** (banques,
> logiciels de niche, questions « à partir de… »). On ne crée PAS de page dédiée :
> on les **absorbe** via les FAQ (schema FAQ) et les sections des pages ci-dessus.
> Ex. : « facturation électronique banque populaire / crédit mutuel / qonto » →
> une section « Ma banque / mon logiciel s'en charge-t-il ? » dans la page #6.

---

## 4. Maillage interne (règles)

- **Chaque spoke** lie vers le **pilier** (#0) au moins 1× dans le corps + 1× en
  `related`.
- **Le pilier** lie vers **tous les spokes** (table des matières / « selon votre
  cas ») → il devient le hub d'autorité.
- **Les personas** (#1,3,4,9,13,14) lient vers : pilier + `/services/automatisation`
  (délégation) + le comparatif (#8) quand l'internaute doit choisir un outil.
- **Le comparatif** (#8) et **gratuit** (#5) portent le CTA commercial le plus fort
  (intent d'achat) → lien direct vers l'accompagnement du pilier + `/services`.
- **Les outils** (#17,18) sont liés depuis le pilier ET depuis chaque persona
  (« calculez votre date exacte »).

---

## 5. Monétisation par page

| Page | Offre portée |
|------|--------------|
| Pilier #0 | **Accompagnement conformité 150 € (cal)** + [ebook « Kit conformité » à venir] + `/services/automatisation` (sur devis) |
| Personas #4,9,13,14 | CTA vers accompagnement du pilier + `/services/automatisation` |
| Comparatif #8, Gratuit #5 | CTA accompagnement (intent d'achat le + chaud) + affiliation possible (liens PA) |
| Info #2,6,7,10,11,12,15,16 | Pas de vente directe : maillage vers pilier (trafic → réassurance) |
| Outils #17,18 | Capture email (lead) + redirection accompagnement |

**Échelle produit recommandée** (à valider) :
1. *(gratuit)* pilier + spokes = aimant à trafic ;
2. *(9-29 €)* **Kit conformité PDF** par persona (checklist + calendrier perso +
   choix PA + modèles Factur-X + FAQ) — à produire quand le ROI trafic est prouvé ;
3. *(150 €)* **accompagnement visio** « on vous met en conformité » ;
4. *(sur devis)* **prestation** digitalisation compta/facturation (`/services`).

---

## 6. Calendrier de publication (vagues)

- **Vague 1 (maintenant)** — pilier #0 + quick wins #1, #2, #3 (diff < 16, rankent
  vite). → **c'est le périmètre implémenté aujourd'hui (phase B).**
- **Vague 2 (S+1/S+2)** — les gros volumes : auto-entrepreneur #4, gratuit #5,
  plateforme agréée #6, 2026 #7 + **simulateur #17** (différenciation).
- **Vague 3 (S+3/S+4)** — comparatif #8, TPE/PME #9, formats #10, e-reporting #11,
  mentions #12.
- **Vague 4** — personas pro #13, #14, Chorus Pro #15, sanctions #16 + comparateur #18.
- **Batch 2 personas** (restaurant, artiste-auteur, VTC, BTP, agriculteur) selon
  traction.

---

## 7. Règles éditoriales & E-E-A-T (YMYL)

- **Exactitude d'abord** : chaque affirmation de date/seuil/format doit être
  vérifiable (BOFiP, DGFiP, décret). En cas de doute → phrase prudente +
  « vérifiez auprès de votre expert-comptable / de la DGFiP ».
- **Date de mise à jour visible** + re-vérification à chaque évolution (les reports
  successifs ont déjà piégé beaucoup de contenus concurrents → angle « à jour »).
- **Distinguer réception (1er sept. 2026, tous) et émission (2026 GE/ETI, 2027
  PME/TPE/micro)** — c'est la confusion n°1 des internautes, donc notre angle clé.
- **Longue traîne dans les FAQ** (schema FAQ) pour absorber les 330 variantes.
- **Pas de sur-promesse** : ne jamais vendre un PDF non produit (respect du
  garde-fou `validateCatalog` : un produit `pdf` sans fichier livrable = interdit).

---

## 8. Mesure

- Suivi GSC via `npm run gsc:report` (pages indexées, positions).
- KPI par vague : impressions → clics → position moyenne sur le KW principal.
- Cible quick wins (diff < 16) : top 10 sous 6-10 semaines.
- Conversion : clics accompagnement / trafic pilier ; leads outils.

---

## 9. Faits de référence (à garder exacts)

| Fait | Valeur |
|------|--------|
| Réception e-facture obligatoire | **1er sept. 2026** — TOUTES les entreprises |
| Émission — grandes entreprises + ETI | **1er sept. 2026** |
| Émission — PME, TPE, micro, indépendants | **1er sept. 2027** |
| Périmètre | B2B entre assujettis établis en France (+ e-reporting B2C/international) |
| Formats structurés | **Factur-X** (PDF+XML), **UBL**, **CII** |
| Canal | via une **Plateforme Agréée (PA)** — anciennement « PDP » ; le PPF devient annuaire |
| Donnée émetteur contrôlée | **SIREN** obligatoire (⚠️ impact décision d'identité My KMK / DTA) |

> Source calendrier confirmée (recherche 2026-09-02) : Cegid, Pennylane, Kolecto.
> À revérifier à chaque évolution réglementaire avant publication.
