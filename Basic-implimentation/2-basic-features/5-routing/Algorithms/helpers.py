import json, os, sys
from math import sqrt

rawJsonFile = None

with open('Basic-implimentation/data/ronse-streets-filtered.json') as f:
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
def get_waypoints_raw(fulldata=False):
    raw = rawJsonFile
    res=[]
    for street in raw.values():
        for part in street['parts']:
            d = part['coords'] if fulldata else part['coords'][0]
            res.append(d)
    return flatten(res) if fulldata else res

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



# turns ids [2,3,11..] back into a route {"mame":{...}}
# overcomplicated but it works...
def ids_to_route_and_geojson(ids):
    ''' 2. restructure '''
    waypoints_raw = get_waypoints_raw()
    # get the original coordinates back
    restructured = [waypoints_raw[i] for i in ids]
    # NOTE: for testing in eg. geojson.iom you need to reverse the choords
    # purpose so we dont end up at the horn of africa (not a joke)
    #restructured = [i[::-1] for i in restructured]
    print('\n*---------- restructured ----------*')
    print(restructured)

    ''' 3. retrieve original ids of parts of streets now in correct order '''
    # reverse the process to gain the ID's of each part
    waypoints_reversed = get_waypoints_reversed()
    part_ids = [waypoints_reversed[str(i)] for i in restructured]
    print('\n*---------- part ids ----------*')
    print(part_ids)

    ''' 4. restructure original json, using the ids create a new street data json file, this time in correct order '''
    # reverse the process to gain the ID's of each part
    final = []
    geojson_test = []

    parts = get_waypoints_parts()

    for id in part_ids:
        final.append(parts[id])
        geojson_test.append([i[::-1] for i in parts[id]['coords']])

    # flatten geojson
    geojson_test = flatten(geojson_test)
            
    print('\n*---------- FINAL ----------*')
    print(final)
            
    print('\n*---------- geojson ----------*')
    print(geojson_test)
    return [final, geojson_test]









def toFixed(n):
    return "{:10.3f}".format(n)


def scaleNum(n, oldmin, oldmax, newmin, newmax):
    return(((n - oldmin) * (newmax - newmin)) / (oldmax - oldmin)) + newmin


# custom maade stuout progress bar
def printProgress(c, m=100, msg=''):
    done =  float(toFixed(scaleNum(c, 0, m, 0, 50)))
    sys.stdout.write('\r[{}{}]{}'.format('🥑' * int(done), '..' * int(50-done), str(c)+"/"+str(m)+"  "+msg  ))
    sys.stdout.flush()

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
        






# print([i[::-1] for i in get_waypoints_raw()][:4])