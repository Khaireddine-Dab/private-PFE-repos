import os
import re

def analyze_buttons(directory):
    working = []
    not_working = []

    # Regex to match <Button ...>, <button ...>, <IconButton ...>
    button_pattern = re.compile(r'<([A-Za-z]*?[bB]utton)([^>]*?)(?:/?>|>(.*?)</\1>)', re.DOTALL)
    
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
        if '.git' in dirs:
            dirs.remove('.git')
            
        for file in files:
            if not file.endswith('.tsx'):
                continue
                
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception:
                continue
                
            # Find all button occurrences
            for match in button_pattern.finditer(content):
                tag = match.group(1)
                props = match.group(2)
                
                # Check what's in props
                has_onclick = 'onClick' in props
                has_type = 'type=' in props
                is_submit = 'type="submit"' in props
                has_href = 'href=' in props
                is_asChild = 'asChild' in props
                is_disabled = 'disabled' in props
                
                is_working = has_onclick or is_submit or has_href or is_asChild or is_disabled
                
                start_index = match.start()
                line_no = content.count('\n', 0, start_index) + 1
                
                item = {
                    'file': os.path.relpath(file_path, directory),
                    'line': line_no,
                    'tag': tag,
                    'props': props.strip().replace('\n', ' ')[:100] + '...',
                    'reason': []
                }
                
                if is_working:
                    if has_onclick: item['reason'].append('onClick')
                    if is_submit: item['reason'].append('submit')
                    if has_href: item['reason'].append('href')
                    if is_asChild: item['reason'].append('asChild')
                    if is_disabled: item['reason'].append('disabled')
                    working.append(item)
                else:
                    if has_type and not is_submit:
                        item['reason'].append("type=" + str([p for p in props.split() if 'type=' in p]))
                    else:
                        item['reason'].append('no click handler')
                    not_working.append(item)
                    
    return working, not_working

if __name__ == '__main__':
    base_dir = r"c:\Users\21650\Desktop\ro2ya-website"
    w, nw = analyze_buttons(base_dir)
    print(f"Working buttons: {len(w)}")
    print(f"Non-working buttons: {len(nw)}")
    
    print("\n--- NON-WORKING BUTTONS LIST ---")
    for b in nw:
        print(f"{b['file']}:{b['line']} - <{b['tag']}> {b['reason']}")
