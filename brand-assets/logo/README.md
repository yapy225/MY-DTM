# My DTM Paris — Logo & identité visuelle

Agence digitale Paris · création web · SEO · marketing digital.

## Concept retenu

**Badge « M » signal + wordmark curseur**, dégradé néon.

- **Symbole** : un « M » formé de 4 barres montantes (signal / croissance / data)
  dans un badge *squircle*, coiffé d'un point néon. Lecture immédiate « digital + performance ».
- **Wordmark** : `My – DTM Paris`, le trait d'union réinventé en **curseur/prompt**
  magenta, point terminal cyan (langage du code / de l'IA) ; « Paris » en lilas allégé.

## Fichiers (3 variantes conservées)

| Fichier | Usage |
|---|---|
| `logo-primary-light.svg` | **Version principale** — fonds clairs (encre `#17123a`) |
| `logo-mono.svg` | Monochrome adaptatif (`currentColor`) — tampon, gravure, 1 couleur |
| `logo-symbol.svg` | Symbole seul — favicon, avatar réseaux, app icon |
| `exports/` | PNG @2x + icônes 512/192/32/16 (transparents) |
| `planche-finale.png` | Planche de présentation |

### Régénérer les exports
Ouvrir `final-preview.html` et relancer le bloc d'export (Chrome headless), ou
`rsvg-convert -w 1560 logo-primary-light.svg -o exports/logo-primary-light@2x.png`.

## Palette

| Rôle | Hex |
|---|---|
| Encre / fond | `#0E0A1A` |
| Cyan | `#29F5EB` |
| Bleu électrique | `#4D71EE` |
| Magenta | `#E511E6` |
| Lilas (texte secondaire) | `#9C6FDD` |

Dégradé de marque : `#29F5EB → #4D71EE → #E511E6` (cyan → bleu → magenta).

## Typographie

**Poppins** (700 / 800 wordmark · 500 baseline). Alternative système : Segoe UI / sans-serif.

## Règles d'usage

- Zone de protection : au moins la hauteur du point néon du badge autour du logo.
- Taille mini wordmark : 120 px de large ; en dessous, utiliser le symbole seul.
- Ne pas : déformer, changer les couleurs du dégradé, poser la version sombre
  sur fond clair (utiliser la variante dédiée).

## Intégration Next.js (à faire, sur validation)

- `src/app/icon.png` ← `exports/icon-512.png` (favicon auto)
- `src/app/apple-icon.png` ← `exports/icon-192.png`
- Logo header : importer `logo-primary-dark.svg`
