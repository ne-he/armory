# ARMORY HALL

A cinematic portfolio built as a two act sequence. Act one is a dark hall that powers on as
you scroll. Act two is an arsenal where each project steps out as its own unit with a class,
a colour, and a dossier.

**Live:** https://armory-rouge.vercel.app

## Why it is built this way

A grid of project cards tells you nothing about the work. Giving each project a unit
identity forces every entry to answer the same questions in the same format: what it does,
what it is built with, how far it actually got, and where to see it. The character select
framing is the delivery mechanism, not the point.

## How it works

Every unit is one object in the `PROJECTS` array at the top of `armory.js`. Adding a project
means adding one object there, not touching markup:

```js
{ id:'13', unit:'LEDGER', name:'E-Commerce Sales Analysis', type:'Data Analysis / BI',
  class:'Scout', accent:'#3fb27f', status:'live',
  summary:'one line pitch', description:`the full paragraph`,
  tech:['Python','pandas','React'],
  links:{ live:'https://...', code:'https://github.com/ne-he/...' } }
```

- `status: 'coming_soon'` renders a locked, not yet declassified unit.
- A unit without a live URL can set `links.note` (for example `'iOS app, no web demo'`), and
  the dossier shows that instead of a dead button.
- The language bars in each dossier are real: `LANGS_BY_ID` holds the split from each repo's
  GitHub `/languages` endpoint, rounded to sum 100.
- The roster order is deliberate. The flagship work comes first and smaller builds sit at the end.

## Stack

No framework, no build step, and no runtime dependencies. The site is plain HTML, CSS, and
JavaScript so it loads fast and stays easy to edit.

| Concern | How |
| --- | --- |
| Hall sequence | 240 frame JPG sequence scrubbed on a canvas by a hand-written scroll driver |
| Roster | three slot step navigation (previous, centre, next) with a bottom unit rail |
| Visuals | AI generated stills of the hall and the unit art |
| Hosting | Vercel, static |

`armory.js` also supports GSAP ScrollTrigger when `window.gsap` is present, but the live page
does not load it and runs on the manual driver.

## Structure

```
index.html      markup, head metadata and section scaffolding
armory.css      theme, layout, unit styling
armory.js       project data, scroll sequence, canvas scrubbing, roster and dossier
generated/      hall stills, unit art and the idle loop
public/         frame sequence and portrait
media/          supporting images
og.jpg          social preview image
```

`.vercelignore` keeps working files such as this README and `reference/` off the live site.

## Running locally

No install needed. Serve the folder over HTTP:

```bash
npx serve .
```

Add `?calibrate` to the URL to drag units into position and log their coordinates.
