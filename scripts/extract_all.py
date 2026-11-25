import zipfile
import json
import urllib.parse
import os
import shutil

zip_path = '../reference-pack/traces/desktop.zip'

print('Opening trace zip...')
with zipfile.ZipFile(zip_path, 'r') as z:
    # 1. Extract the main CSS file
    css_res = 'resources/88b85a219cd951f65ebcec396a876a2735629318.css'
    if css_res in z.namelist():
        with z.open(css_res) as src_f, open('public/original.css', 'wb') as dst_f:
            dst_f.write(src_f.read())
        print('Saved public/original.css')

    # 2. Extract media
    # Map from target path in public/ to (file_in_zip, width)
    media_map = {}
    with z.open('trace.network') as f:
        for line in f:
            entry = json.loads(line)
            if entry.get('type') == 'resource-snapshot':
                snap = entry.get('snapshot', {})
                url = snap.get('request', {}).get('url', '')
                resp_content = snap.get('response', {}).get('content', {})
                resp_file = resp_content.get('_file')
                if not resp_file or resp_file not in z.namelist():
                    continue

                parsed = urllib.parse.urlparse(url)
                if '_next/image' in parsed.path:
                    qs = urllib.parse.parse_qs(parsed.query)
                    target_url = qs.get('url', [None])[0]
                    width = int(qs.get('w', [0])[0])
                    if target_url and target_url.startswith('/media/'):
                        rel_path = target_url.lstrip('/')
                        if rel_path not in media_map or width > media_map[rel_path][1]:
                            media_map[rel_path] = (resp_file, width)
                elif parsed.path.startswith('/media/'):
                    rel_path = parsed.path.lstrip('/')
                    media_map[rel_path] = (resp_file, 9999)
                elif parsed.path.startswith('/brand/'):
                    rel_path = parsed.path.lstrip('/')
                    media_map[rel_path] = (resp_file, 9999)

    print(f'Total unique media targets identified: {len(media_map)}')
    extracted_count = 0
    for target_rel, (resp_file, w) in media_map.items():
        dst_path = os.path.join('public', target_rel)
        os.makedirs(os.path.dirname(dst_path), exist_ok=True)
        with z.open(resp_file) as src_f, open(dst_path, 'wb') as dst_f:
            dst_f.write(src_f.read())
        extracted_count += 1

    print(f'Successfully extracted {extracted_count} media files to public/!')
