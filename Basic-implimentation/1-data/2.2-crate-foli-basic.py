import folium, json, random
from operator import attrgetter

# Define the location of Ronse
ronse_latitude = 50.76
ronse_longitude = 3.57

# Create a Folium map centered on Ronse
m = folium.Map(location=[ronse_latitude, ronse_longitude], zoom_start=13)


data = {}
with open("../data/StreetsAll.json", "r") as read_file:
    data = json.load(read_file)



nodes={}
ways={}
# iterate all json and sort streets/ways from nodes
for elm in data['elements']:
    if elm['type'] == "way":
        if elm['tags']['name'] not in ways:
            ways[elm['tags']['name']] = elm
    else:
        nodes[elm['id']] = [elm['lat'], elm['lon']]
        

# create polyline of all nodes of each street
for street in ways.values():
    color = ["#"+''.join([random.choice('ABCDEF0123456789') for _ in range(6)])]
    folium.PolyLine(locations=[nodes[t] for t in street['nodes']], color=color, weight=2.5, opacity=1).add_to(m)



# Save the map to a file
m.save('ronse_streets.html')
