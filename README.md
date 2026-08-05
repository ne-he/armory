# ARMORY HALL

A cinematic portfolio built as a two act sequence. Act one is a dark hall that powers on as
you scroll. Act two is an arsenal where each project steps out as its own unit with a class,
a colour, and a stat block.

**Live:** https://armory-rouge.vercel.app

## Why it is built this way

A grid of project cards tells you nothing about the work. Giving each project a unit
identity forces every entry to answer the same three questions in the same format: what it
does, what it is built with, and how far it actually got. The character select framing is
the delivery mechanism, not the point.

## How it works

Everything renders from `projects.json`. Adding a project means adding one object to that
file, not touching markup. Each entry carries:

```json
{
  "unit": "02 AZURE",
  "class": "Guardian",
  "accent": "#2e6fe0",
  "name": "Feature Store MVP",
  "type": "Data Engineering / MLOps",
  "summary": "one line pitch",
  "description": "the full paragraph",
  "tech": ["Python", "PostgreSQL", "Redis"],
  "stats": { "pwr": 90, "spd": 70, "def": 85 },
  "links": { "live": "", "repo": "" },
  "status": "live"
}
```

`status` controls whether a bay renders as an active unit or as a locked, not yet
declassified slot.

## Stack

No framework and no build step. The site is plain HTML, CSS, and JavaScript so it loads
fast and stays easy to edit.

| Concern | Tool |
| --- | --- |
| Motion and scroll | GSAP |
| Hall sequence | Canvas frame scrubbing |
| Particles | tsParticles |
| Visuals | AI generated stills |
| Hosting | Vercel |

## Structure

```
index.html      markup and section scaffolding
armory.css      theme, layout, unit styling
armory.js       scroll sequence, canvas scrubbing, unit rendering
projects.json   the project data that drives everything
media/          hall footage and frame sequences
public/         unit art
```

## Running locally

No install needed. Serve the folder over HTTP so `fetch` on `projects.json` works:

```bash
npx serve .
```

Opening `index.html` directly from disk will fail on the JSON fetch.
