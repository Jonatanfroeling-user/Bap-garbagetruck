import json, os
from math import sqrt

rawJsonFile = None

with open('Basic-implimentation/data/ronse-StreetParts-276.json') as f:
        rawJsonFile = json.load(f)

# returns the raw coords of only first and last coorindate of every part, ie. waypoints
def get_waypoints(fulldata=False):
    raw = rawJsonFile
    res={}
    for street in raw.values():
        n = []
        for part in street['parts']:

            data =  part['coords'] if fulldata else part['coords'][::len(part['coords'])-1]
            n.append({'id': part['id'], 'waypoint': [data]})
        res[street['name']] = n
    return res

# reversed veriosn of "get_waypoints_raw". ie. : {"[50.746604, 3.606773]": 8117600,  ....
def get_waypoints_reversed():
    raw = rawJsonFile
    res={}
    for street in raw.values():
        for part in street['parts']:
            res[str(part['coords'][0])] =  part['id']
    return res

# waypoints by only giving the frist coordiantes of the waypoint (limiting waypions from 800 to 100)
def get_waypoints_raw():
    raw = rawJsonFile
    res=[]
    for street in raw.values():
        for part in street['parts']:
            res.append(part['coords'][0])
    return res

# returns the parts only, {id: coords, ...}
def get_waypoints_parts():
    raw = rawJsonFile
    res={}
    for name, street in raw.items():
        for part in street['parts']:
            res[part['id']] =  {
              'street': name,
              'coords': part['coords']
              }
          #res[part['id']] = part['coords']
    return res








def flatten(l):
    return [item for sublist in l for item in sublist]

def get_dis(a, b):
    return sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)

def get_path_length(path, waypoints):
    total = 0
    for i in range(len(path)-1):
        total += get_dis(waypoints[path[i]], waypoints[path[i+1]])
    return total


# output data in json format
def out(json_dict ,filename='data'):        
    with open("Basic-implimentation/2-basic-features/5-routing/Algorithms/"+filename+".json", "w") as outfile:
        json.dump(json_dict, outfile, indent=4, sort_keys=False)
        

print([i[::-1] for i in get_waypoints_raw()])