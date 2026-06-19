import os
import re

workspace_dir = r"C:\Users\Owner\.gemini\antigravity\workspace\Templetes"
categories = [
    "architect & interor designer", "Electronic", "Pharma & surgical", "cake & bakery", 
    "salons", "Marriage garden", "ART & MUSIC & DANCE CLASSES", "FURNITURE MANUFACTURER", 
    "Furniture", "LIGHTS & LAMPS", "packers & movers", "Gym & Fitness", "FMCG", 
    "Kitchen Equipment and coolers", "Home interior", "Sanitary & tile", "Jewellers", 
    "Clothing", "Events", "advocate"
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return 0

    original = content

    # Very generic replacements if they exist and are not tokenized
    # We avoid doing this aggressively so we don't break JS code.
    # If the user already tokenized them, we will find 0 replacements.
    
    # In CSS styles.css
    if filepath.endswith('styles.css') or filepath.endswith('style.css'):
        # Check if --primary-color is already tokenized
        if '{{PRIMARY_COLOR}}' not in content:
            content = re.sub(r'--primary-color:\s*#[a-fA-F0-9]+;', '--primary-color: {{PRIMARY_COLOR}};', content)

    # In HTML/JSX files
    if filepath.endswith('.html') or filepath.endswith('.jsx'):
        # Basic check for missing {{EMAIL}} inside generic mailto or placeholder
        if '{{EMAIL}}' not in content:
            content = re.sub(r'href="mailto:[^"]+"', 'href="mailto:{{EMAIL}}"', content)
            
    # Write back if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return 1
    return 0

total_changes = 0
for cat in categories:
    cat_dir = os.path.join(workspace_dir, cat)
    if not os.path.exists(cat_dir):
        print(f"Skipping {cat}, directory not found.")
        continue
    
    for root, dirs, files in os.walk(cat_dir):
        if 'node_modules' in root or '.git' in root:
            continue
        for file in files:
            if file.endswith(('.html', '.css', '.js', '.jsx')):
                total_changes += process_file(os.path.join(root, file))

print(f"Migration script finished. Modified {total_changes} files.")
