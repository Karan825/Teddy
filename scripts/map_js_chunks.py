import zipfile, json

with zipfile.ZipFile('../reference-pack/traces/desktop.zip', 'r') as z:
    with z.open('trace.network') as f:
        for line in f:
            entry = json.loads(line)
            if entry.get('type') == 'resource-snapshot':
                snap = entry.get('snapshot', {})
                url = snap.get('request', {}).get('url', '')
                if url.endswith('.js'):
                    resp = snap.get('response', {}).get('content', {})
                    print(url, '->', resp.get('_file'), 'size:', resp.get('size'))
