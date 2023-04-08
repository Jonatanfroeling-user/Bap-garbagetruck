from helpers import get_waypoints_raw, out, ids_to_route_and_geojson
from algorithms import two_opt
import datetime
 

'''
Will give the fastest possible solution with relatevly high accuacy
It does take nearly one hour to finish 100 waypoints. 
'''

print('Start 2-opt time:', datetime.datetime.now())
waypoints_raw = get_waypoints_raw()

res = two_opt(waypoints_raw)

print('*---------- 2-opt ----------*')
print(res)
reformed, geojson = ids_to_route_and_geojson(res)
out(res, '2-opt-res')



print("\n\nFinished at: ", datetime.datetime.now())

