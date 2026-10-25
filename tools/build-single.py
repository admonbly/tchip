"""Assemble Tchip en un seul fichier HTML autonome (dist/tchip.html).
Usage : python3 tools/build-single.py [--fragment]
--fragment : sans <!doctype>/<head>, pour une page hébergée qui fournit déjà le squelette.
"""
import base64, pathlib, re, sys
racine = pathlib.Path(__file__).resolve().parent.parent
fragment = "--fragment" in sys.argv
css = (racine / "styles.css").read_text(encoding="utf-8")
data = (racine / "data/expressions.js").read_text(encoding="utf-8")
verif = (racine / "verification.js").read_text(encoding="utf-8")
verif += "\n" + (racine / "apprentissage.js").read_text(encoding="utf-8")
app = (racine / "app.js").read_text(encoding="utf-8")
ico = base64.b64encode((racine / "assets/favicon-32.png").read_bytes()).decode()
fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@400;500;600;700;800&display=swap">'
tete = ('<title>Tchip</title>\n'
        '<meta name="description" content="Tchip — Tu parles d\'où ? Chaque jour, une expression de la francophonie à deviner.">\n'
        '<meta name="theme-color" content="#FF4D2E">\n'
        '<meta name="color-scheme" content="light dark">\n'
        '<meta name="format-detection" content="telephone=no">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n'
        '<meta name="mobile-web-app-capable" content="yes">\n'
        '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n'
        '<meta name="apple-mobile-web-app-title" content="Tchip">\n'
        '<meta name="claude:viewport-fit-sides" content="cover">\n'
        f'<link rel="icon" href="data:image/png;base64,{ico}">\n{fonts}\n<style>\n{css}\n</style>\n')
corps = ('<main class="app" id="app" aria-live="polite"></main>\n<div class="toast" id="toast" role="status"></div>\n'
         f'<script>\n{data}\n</script>\n<script>\n{verif}\n</script>\n<script>\n{app}\n</script>\n')
if fragment:
    html = tete + corps
else:
    html = ('<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + tete + '</head>\n<body>\n' + corps + '</body>\n</html>\n')
out = racine / "dist" / ("tchip-fragment.html" if fragment else "tchip.html")
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print(out, len(html), "octets")
