# Neuromodulators · Melanie Petro, MD

An illustrated guide to facial movement and neuromodulators by Melanie Petro, MD, Facial Plastic Surgeon. This repository contains the current public mint edition and its editable files.

**Live page:** https://melanie-petro-neuromodulators.ariell.chatgpt.site/

The page adapts to phones and computers. It includes eight chapters, facial muscle and treatment-area explorers, movement arrows, and an interactive nerve-signal illustration.

## Preview locally

This is a plain HTML, CSS, and JavaScript site. It requires no package installation or build step.

From this folder, run:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/ in a browser. Open http://localhost:8080/mobile-preview.html for the interactive 390-pixel phone preview.

## Edit the page

| File | Purpose |
| --- | --- |
| `index.html` | Page copy, chapter structure, and static illustrations |
| `styles.css` | Layout, typography, responsive sizing, and highlights |
| `app.js` | Muscle, expression, treatment-area, and movement-pattern explorers |
| `mechanism.js` | Interactive nerve-signal illustration |
| `mechanism.css` | Nerve-signal illustration styling |
| `assets/` | Eight illustrations used by the page |
| `mobile-preview.html` | Optional phone preview wrapper |

The editorial mint highlight is `#7EDDD3`, a screen approximation of Pantone 7471 C. The page uses locally available Cochin, Baskerville, and Helvetica Neue with system fallbacks; typography can vary by device.

## Hosting and website link

Upload the five main HTML/CSS/JavaScript files and `assets/` together to any static host. Preserve their relative paths. No environment variables, server, or API credentials are required.

The public page above is hosted separately through Sites. This GitHub repository is an editable source copy; pushing changes here does not automatically update that live page. Republish the changed page when it is ready.

To add the current page to the practice website, use the live URL as a link or button destination.

Only the current page and its selected illustrations are included. Private research, source photographs, earlier artwork, and revision records are not part of this repository.
