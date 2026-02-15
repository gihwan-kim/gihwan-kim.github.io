# Portfolio Site (Hugo) — YutianChen.blog-style

This repo is a minimal, clean Hugo site with the same overall structure:
**About Me / Posts / Notes** + a **Resume PDF** link.

## Local preview

1) Install Hugo (extended) and Git  
2) Run:

```bash
hugo version
hugo server
```

Then open the local URL printed in your terminal.

## What to edit

- **Profile + homepage sections:** `data/*.yaml`
  - `data/profile.yaml` (name, email, social links, short bio)
  - `data/research.yaml`, `data/projects.yaml`, `data/skills.yaml`, `data/experience.yaml`, `data/courses.yaml`
- **Resume PDF:** replace `static/files/resume.pdf`
- **Avatar:** replace `static/img/avatar.svg`

## Add posts/notes

Create new content:

```bash
hugo new posts/my-post.md
hugo new notes/my-note.md
```

## Deploy to GitHub Pages (recommended)

- Create a repo named: `YOUR_GITHUB_USERNAME.github.io`
- Push this code to the `main` branch
- In GitHub repo settings: **Settings → Pages → Source = GitHub Actions**
- This repo includes an official-style workflow at `.github/workflows/hugo.yaml`
