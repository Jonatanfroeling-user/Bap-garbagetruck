import overpass
from _helpers import out, RONSE_STREETS


    
    
if __name__:
    DATA = None
    print("Gathering street nodes:")
    try:
        api = overpass.API()
        DATA = api.get("area['name'='Ronse']->.a;(way['highway'~'residential|secondary|tertiary|primary']['name'~'"+('|').join(RONSE_STREETS)+"'](area.a););out geom;")

    except Exception as e:
        print('Error:', e)
        
    finally:
        if DATA:
            out(DATA)
        else:
            exit('Error: no data..')
        print('done!')

