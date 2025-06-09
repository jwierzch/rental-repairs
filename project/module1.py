import csv
import os

input_file = 'phillyaddresses.csv'
output_dir = os.path.join('src', 'data')
output_file = os.path.join(output_dir, 'phillyAddresses.ts')

os.makedirs(output_dir, exist_ok=True)

addresses = []

with open(input_file, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        number = row.get('addr:housenumber', '').strip()
        street = row.get('addr:street', '').strip()
        city = row.get('addr:city', '').strip()
        state = row.get('addr:state', '').strip()
        postcode = row.get('addr:postcode', '').strip()
        # Only add if at least number and street are present
        if number and street:
            address = f"{number} {street}"
            if city:
                address += f", {city}"
            if state:
                address += f", {state}"
            if postcode:
                address += f", {postcode}"
            addresses.append(address)

with open(output_file, 'w', encoding='utf-8') as tsfile:
    tsfile.write('// Auto-generated address list\n')
    tsfile.write('export const phillyAddresses = [\n')
    for addr in addresses:
        tsfile.write(f'  {repr(addr)},\n')
    tsfile.write('];\n')

print(f"Extracted {len(addresses)} addresses to {output_file}")
