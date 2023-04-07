from helpers import get_waypoints_raw
from algorithms import tsp, dfs 
import time
 

'''
GOAL: combine differnt algorithms and give a
'''
# timer start
start = time.time()



waypoints = get_waypoints_raw()

tsp_path = tsp(waypoints)

# backtracking  TSP path to account for dead ends
visited = set(tsp_path)
dfs_path = dfs(tsp_path, waypoints, visited, tsp_path[-1])

# If we didn't visit all waypoints, there must be unreachable streets
if len(dfs_path) != len(waypoints):
    print("Some streets are unreachable.")
else:
    print(dfs_path)



# timer end
# source: https://www.geeksforgeeks.org/how-to-check-the-execution-time-of-python-script/
end = time.time()
print("\n\nTotal time: ",
      (end-start) * 10**3, "ms")