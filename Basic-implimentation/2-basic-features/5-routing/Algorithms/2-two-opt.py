from helpers import get_waypoints_raw, out
from algorithms import two_opt
import time
 

'''
Will give the fastest possible solution with relatevly high accuacy
It does take nearly one hour to finish 100 waypoints. 
'''
# timer start
start = time.time()

waypoints_raw = get_waypoints_raw()

res = two_opt(waypoints_raw)

print('*---------- 2-opt ----------*')
print(res)
out(res, '2-opt-res')


end = time.time()
print("\n\nTotal time: ", (end-start) * 10**3, "ms")

