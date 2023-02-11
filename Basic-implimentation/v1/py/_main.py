import pandas as pd
import geopandas as gpd

from _streetHandler import StreetsHandler


"""
Search for pubs in an osm file and list their names.
"""
import osmium
import sys

class NamesHandler(osmium.SimpleHandler):

    def output_target(self, tags):
        if tags.get('addr:city') == 'Ronse' and 'name' in tags:
            print(tags['name'])

    def node(self, n):
        self.output_target(n.tags)

    def way(self, w):
        self.output_target(w.tags)

def main(osmfile):
    NamesHandler().apply_file(osmfile)

    return 0

# if __name__ == '__main__':
#     exit(main('map.osm'))
    
    


handler = StreetsHandler()

# you need to donwload these files
osm_file = f"./ronse2.osm.pbf"
osm_file = f"./ronse1.osm"


# start data file processing
handler.apply_file(osm_file, locations=True, idx='flex_mem')
# show stats
print(f"num_relations: {handler.num_relations}")
print(f"num_ways: {handler.num_ways}")
print(f"num_nodes: {handler.num_nodes}")
# create dataframes
street_relations_df = pd.DataFrame(handler.street_relations)
street_relation_members_df = pd.DataFrame(handler.street_relation_members)
street_ways_df = pd.DataFrame(handler.street_ways)