import json, os
from math import sqrt


# returns the raw coords of only first and last coorindate of every part, ie. waypoints
def get_waypoints():
    with open('Basic-implimentation/data/ronse-StreetParts-276.json') as jsonf:
        raw = json.load(jsonf)
        res={}
        for street in raw.values():
            n = []
            for part in street['parts']:
                first_last = part['coords'][::len(part['coords'])-1]
                n.append({'id': part['id'], 'waypoint': [first_last]})
            res[street['name']] = n
        return res

# waypoints by only giving the frist coordiantes of the waypoint
def get_waypoints_raw():
    with open('Basic-implimentation/data/ronse-StreetParts-276.json') as jsonf:
        raw = json.load(jsonf)
        res=[]
        for street in raw.values():
            for part in street['parts']:
                res.append(part['coords'][0])
        return res




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