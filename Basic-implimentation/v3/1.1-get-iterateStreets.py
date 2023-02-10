import overpass
from time import sleep
from _helpers import out, RONSE_STREETS, printProgress

data_streets = {}


def query1(name):
    return "( way['name'='"+name+"']->.ways_to_exclude;node(w.ways_to_exclude)->.nodes_of_interest; );( way(bn.nodes_of_interest)->.all_wy; - .ways_to_exclude; );node.nodes_of_interest(w);out geom;"

def load_data(name):
    data = None
    api = overpass.API()
    try:
        data = api.get(query1(name))
        return data
    except Exception as e:
        print('\nError!\n')
        print(e)
    finally:
        return data

    
    
    
def iterateData(streets):
    global data_streets
    print("Gathering street nodes:")
    for i in streets:
        printProgress(streets.index(i)+1, len(streets), i)

        r= load_data(i)
        data_streets[i] = r
        sleep(5)



    
    
if __name__:
    try:
        iterateData(RONSE_STREETS)
    except Exception as e:
        print('Error:', e)
    finally:
        out(data_streets)
        print('\ndone!')

