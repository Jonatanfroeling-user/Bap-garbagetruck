import folium, json
from helpers import getHtmlName
from random import randint, choice

# Define the location of Ronse
ronse_latitude = 50.76
ronse_longitude = 3.57

# Create a Folium map centered on Ronse
m = folium.Map(location=[ronse_latitude, ronse_longitude], zoom_start=13)


data = json.load(open("../data/ronse-allStreets-146.json", "r"))

"""
example data:
{
    "id": 8117013,
    "geometry": {
        ...
        "coordinates": [
            [
                3.604631,
                50.744346
            ],
            ... 
        ]
    },
    "properties": {
        ...
        "name": "Ephrem de Malanderplein",
        ...
    }
},


"""
def createPoly(name, coords):
    if not coords or not len(coords):
        return
    color = ["#"+''.join([choice('ABCDEF0123456789') for _ in range(6)])]
    folium.PolyLine(locations=[i[::-1] for i in coords], color=color, weight=3, opacity=1).add_to(m)


# iterate all json and sort streets/ways from nodes
for elm in data['features']:
    createPoly(elm['properties']['name'], elm['geometry']['coordinates'])



# Save the map to a file
m.save(getHtmlName())
