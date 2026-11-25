with open('scripts/mascot_match_0.txt', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

start = text.find('<div aria-hidden="true" class="pup-layer"')
if start != -1:
    end = text.find('</div>', start)
    # find matching closing div for pup-layer
    depth = 0
    i = start
    while i < len(text):
        if text[i:i+4] == '<div':
            depth += 1
            i += 4
        elif text[i:i+6] == '</div>':
            depth -= 1
            i += 6
            if depth == 0:
                break
        else:
            i += 1
    pup_layer_full = text[start:i]
    print('Found complete pup-layer! Length:', len(pup_layer_full))
    with open('scripts/pup_layer_complete.html', 'w', encoding='utf-8') as out:
        out.write(pup_layer_full)
