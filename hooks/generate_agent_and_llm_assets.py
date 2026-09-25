import os
import shutil
import re

ORDERED_DOC_FILES = [
    ("About NANDA & Manifesto", "index.md"),
    ("About Project NANDA", "about/index.md"),
    ("NANDA Index Architecture", "publication/nanda-index.md"),
    ("Open Source & Repositories", "developer/open-source.md"),
    ("Reference Implementation", "developer/reference-implementation.md"),
    ("Hackathons & Challenges", "developer/hackathons.md"),
    ("Fellowships & Research", "developer/fellowships.md"),
    ("Meet the Team & Advisors", "people/team.md"),
    ("Start a Chapter & Global Hubs", "community/start-a-chapter.md"),
    ("Frequently Asked Questions", "resources/faq.md"),
    ("Talks & Keynotes Archive", "resources/talks-archive.md"),
]

def clean_markdown(content):
    # Remove YAML frontmatter
    content = re.sub(r"^---[\s\S]*?---\n", "", content)
    # Remove raw script and style tags
    content = re.sub(r"<script[\s\S]*?</script>", "", content, flags=re.IGNORECASE)
    content = re.sub(r"<style[\s\S]*?</style>", "", content, flags=re.IGNORECASE)
    # Remove HTML comments
    content = re.sub(r"<!--[\s\S]*?-->", "", content)
    # Strip excess empty lines
    content = re.sub(r"\n{3,}", "\n\n", content)
    return content.strip()

def on_pre_build(config):
    docs_dir = config["docs_dir"]
    full_text_parts = [
        "# Project NANDA - Complete Documentation & Technical Specifications",
        "",
        "> Networked AI Agents in a Decentralized Architecture (NANDA)",
        "> Authoritative documentation context generated for LLMs, autonomous agents, and RAG systems.",
        "> Canonical Source: https://projectnanda.org",
        "",
        "---",
        ""
    ]

    for title, rel_path in ORDERED_DOC_FILES:
        file_path = os.path.join(docs_dir, rel_path.replace("/", os.sep))
        if os.path.exists(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    raw = f.read()
                cleaned = clean_markdown(raw)
                full_text_parts.append(f"\n\n## SECTION: {title}\n")
                full_text_parts.append(f"*Path: https://projectnanda.org/{rel_path}*\n")
                full_text_parts.append(cleaned)
                full_text_parts.append("\n\n---\n")
            except Exception as e:
                print(f"[NANDA Hook] Warning: could not process {rel_path}: {e}")

    llms_full_path = os.path.join(docs_dir, "llms-full.txt")
    try:
        with open(llms_full_path, "w", encoding="utf-8") as f:
            f.write("\n".join(full_text_parts))
    except Exception as e:
        print(f"[NANDA Hook] Warning: could not write llms-full.txt: {e}")

def on_post_build(config):
    docs_dir = config["docs_dir"]
    site_dir = config["site_dir"]

    # 1. Copy .well-known directory
    src_well_known = os.path.join(docs_dir, ".well-known")
    dst_well_known = os.path.join(site_dir, ".well-known")
    if os.path.exists(src_well_known):
        os.makedirs(dst_well_known, exist_ok=True)
        for item in os.listdir(src_well_known):
            s = os.path.join(src_well_known, item)
            d = os.path.join(dst_well_known, item)
            if os.path.isfile(s):
                shutil.copy2(s, d)

    # 2. Copy root crawler, LLM text assets, and edge headers
    for filename in ["robots.txt", "llms.txt", "llms-full.txt", "_headers"]:
        src_file = os.path.join(docs_dir, filename)
        dst_file = os.path.join(site_dir, filename)
        if os.path.exists(src_file):
            shutil.copy2(src_file, dst_file)
