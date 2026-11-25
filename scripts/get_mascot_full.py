with open('../reference-pack/desktop/home/page.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('viewBox="0 0 300 240"')
if idx != -1:
    start = max(0, idx - 1000)
    end = min(len(html), idx + 8000)
    snippet = html[start:end]
    # find outer div
    with open('scripts/mascot_container.html', 'w', encoding='utf-8') as out:
        out.write(snippet)
    print("Saved snippet around mascot to scripts/mascot_container.html")
