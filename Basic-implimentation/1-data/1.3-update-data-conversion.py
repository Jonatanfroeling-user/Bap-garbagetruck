import json
from _helpers import out




with open('Basic-implimentation/data/ronse-allStreets-146.json') as jsonf:
    d = json.load(jsonf)['features']
    res={}
    for part in d:
        name = part['properties']['name']
        coords = part['geometry']['coordinates']
        if not len(coords):
            continue
        packet = {
            'id': part['id'],
            'name': name,
            'coords':[i[::-1] for i in coords],

        }
        if name in res:
            res[name]['parts'].append(packet)
        else:
            res[name] = {
                'name':name,
                'parts':[packet]
            }
    out(res)#.values()
    