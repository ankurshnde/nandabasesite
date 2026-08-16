---
title: Open Source Contribution - NANDA
description: Guidelines, environment setup, and contribution standards for the NANDA codebase.
---

# Open Source Contribution

NANDA is developed collaboratively under permissive open-source licenses. We encourage contributions ranging from core protocol implementations to documentation and empirical benchmark datasets.

---

## Development Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/nandainitiative/nanda.git
cd nanda
```

### 2. Setup Virtual Environment
```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev,test]"
```

### 3. Running Test Suites
```bash
pytest tests/ -v --cov=nanda
```

### 4. Code Standards & Static Analysis
We enforce strict linting, formatting, and static type analysis:
```bash
# Code formatting
black nanda/ tests/
ruff check --fix nanda/

# Type checking
mypy nanda/
```

---

## Contribution Process

1. **Issue Discussion**: Before starting major architectural modifications, open an RFC issue on GitHub to discuss the design with working group maintainers.
2. **Branching Strategy**: Branch from `main` with descriptive branch names (`feat/`, `fix/`, `docs/`).
3. **Pull Requests**: Pull requests must include corresponding unit tests, benchmark impact numbers (if modifying core engine code), and documentation updates.
