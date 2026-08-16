# NANDA Documentation & Web Portal

Built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install mkdocs mkdocs-material
```

### 2. Run Local Development Server
```bash
mkdocs serve
```
Open your browser at `http://127.0.0.1:8000/`.

### 3. Build Static Site for Production
```bash
mkdocs build --strict
```
The static site bundle will be generated in the `site/` folder.

---

## 📁 Directory Structure

```
.
├── mkdocs.yml                 # Main site configuration & navigation
├── overrides/                 # Custom theme templates
│   └── main.html
├── docs/                      # Markdown content pages
│   ├── index.md               # Research (Overview)
│   ├── publication/
│   │   ├── writing-lab.md     # Writing Lab
│   │   └── nanda-index.md     # NANDA Index
│   ├── projects/
│   │   └── index.md           # Projects Overview (with links to NANDA Town ↗, NEST ↗, KumbhDoot ↗, DigitDoot ↗, Civic Agents ↗)
│   ├── community/
│   │   ├── index.md           # Community Overview
│   │   ├── events.md          # Events
│   │   ├── global-chapter.md  # Global Chapter
│   │   └── youth-chapter.md   # Youth Chapter
│   ├── developer/
│   │   ├── index.md           # Developer Overview
│   │   ├── build-with-nanda.md # Build w/ NANDA
│   │   ├── reference-implementation.md # Reference Implementation
│   │   └── open-source.md     # Open Source Contribution
│   ├── people/
│   │   ├── advisors.md        # Advisors
│   │   └── team.md            # Team
│   ├── resources/
│   │   ├── faq.md             # FAQ
│   │   ├── previous-work.md   # Previous work
│   │   ├── video-vault.md     # Video Vault
│   │   └── media-kit.md       # Media Kit
│   └── assets/
│       ├── logo.svg           # Vector Logo
│       ├── stylesheets/
│       │   └── extra.css      # Custom styling & layout adjustments
│       └── javascripts/
│           └── extra.js       # Navigation accordion & interactive enhancements
└── README.md
```
