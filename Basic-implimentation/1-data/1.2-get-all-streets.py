import overpass, json, pprint
from _helpers import out, RONSE_STREETS




with open('Basic-implimentation/data/ronse-allStreets-146.json') as jsonf:
    d = json.load(jsonf)['features']
    res={}
    for part in d:
        name = part['properties']['name']
        coords = part['geometry']['coordinates']
        if not len(coords):
            continue
        packet = {
            'coords':coords,
            'id': part['id']
        }
        if name in res:
            res[name]['parts'].append(packet)
        else:
            res[name] = {
                'name':name,
                'parts':[packet]
            }
    print(res)


"""
Original code and query
"""
# if __name__:
#     DATA = None
#     print("Gathering street nodes:")
#     try:
#         api = overpass.API()
#         DATA = api.get("area['name'='Ronse']->.a;(way['highway'~'residential|secondary|tertiary|primary']['name'~'"+('|').join(RONSE_STREETS[:3])+"'](area.a););out geom;")
#     except Exception as e:
#         print('Error:', e)
        
#     finally:
#         if DATA:
#             out(DATA)
#         else:
#             exit('Error: no data..')
#         print('done!')

