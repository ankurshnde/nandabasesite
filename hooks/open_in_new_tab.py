from bs4 import BeautifulSoup
from urllib.parse import urlparse
from mkdocs.utils import get_relative_url
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
        if netloc in ("projectnanda.org", "www.projectnanda.org", "nanda.ai", "www.nanda.ai", "localhost", "127.0.0.1"):
            return False
        return True
    return False

def get_nav_label(p):
    if not p:
        return ""
    if p.title == "Overview" and p.ancestors:
        return f"{p.ancestors[0].title} Overview"
    if p.title == "Project NANDA" and p.ancestors:
        return f"About {p.title}"
    return p.title

def on_post_page(output, page, config):
    soup = BeautifulSoup(output, "html.parser")

    # Add Next / Previous navigation for all content pages except the home page and modals
    src_uri = getattr(getattr(page, "file", None), "src_uri", "")
    is_home = (src_uri == "index.md" or src_uri == "")
    is_modal = "sf-bay-area" in src_uri
    is_privacy = src_uri == "privacy.md"

    if not is_home and not is_modal and not is_privacy and (page.previous_page or page.next_page):
        article = soup.find("article", class_="md-content__inner")
        if article:
            prev_html = ""
            if page.previous_page:
                prev_url = get_relative_url(page.previous_page.url, page.url)
                prev_label = get_nav_label(page.previous_page)
                prev_html = (
                    f'<a href="{prev_url}" class="nanda-page-nav__link nanda-page-nav__link--prev">'
                    f'<span class="nanda-page-nav__direction">&larr; Previous</span>'
                    f'<span class="nanda-page-nav__title">{prev_label}</span>'
                    f'</a>'
                )
            else:
                prev_html = '<div class="nanda-page-nav__spacer"></div>'

            next_html = ""
            if page.next_page:
                next_url = get_relative_url(page.next_page.url, page.url)
                next_label = get_nav_label(page.next_page)
                next_html = (
                    f'<a href="{next_url}" class="nanda-page-nav__link nanda-page-nav__link--next">'
                    f'<span class="nanda-page-nav__direction">Next &rarr;</span>'
                    f'<span class="nanda-page-nav__title">{next_label}</span>'
                    f'</a>'
                )
            else:
                next_html = '<div class="nanda-page-nav__spacer"></div>'

            nav_html = f'<nav class="nanda-page-nav" aria-label="Page navigation">{prev_html}{next_html}</nav>'
            nav_soup = BeautifulSoup(nav_html, "html.parser").find("nav")

            about_footer = article.find("div", class_="nanda-about-footer")
            if about_footer:
                about_footer.insert_before(nav_soup)
            else:
                article.append(nav_soup)

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
