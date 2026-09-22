from bs4 import BeautifulSoup
from urllib.parse import urlparse
import re

def is_external_url(href):
    if not href:
        return False
    href = href.strip()
    if href.startswith("#") or href.startswith("javascript:") or href.startswith("mailto:") or href.startswith("tel:"):
        return False
    parsed = urlparse(href)
    if parsed.scheme in ("http", "https"):
        netloc = parsed.netloc.lower()
        if netloc in ("nanda.ai", "www.nanda.ai", "localhost", "127.0.0.1"):
            return False
        return True
    return False

def on_post_page(output, page, config):
    soup = BeautifulSoup(output, "html.parser")

    for a in soup.find_all("a"):
        href = a.get("href", "")
        if is_external_url(href):
            a["target"] = "_blank"
            a["rel"] = "noopener noreferrer"
            if "↗" in a.get_text():
                classes = a.get("class", [])
                if isinstance(classes, str):
                    classes = classes.split()
                if "nanda-has-arrow" not in classes:
                    classes.append("nanda-has-arrow")
                a["class"] = classes
        else:
            # Internal links must open in the same tab
            if a.get("target") == "_blank":
                del a["target"]
            rel = a.get("rel")
            if rel:
                if isinstance(rel, list):
                    rel = [r for r in rel if r not in ("noopener", "noreferrer")]
                    if rel:
                        a["rel"] = rel
                    else:
                        del a["rel"]
                elif rel in ("noopener noreferrer", "noreferrer noopener", "noopener", "noreferrer"):
                    del a["rel"]

    # Sanitize any accidental double redirect symbols in all text nodes
    for text_node in soup.find_all(string=True):
        if "↗" in text_node:
            new_text = re.sub(r"↗\s*↗+", "↗", text_node)
            if new_text != text_node:
                text_node.replace_with(new_text)

    return str(soup)

