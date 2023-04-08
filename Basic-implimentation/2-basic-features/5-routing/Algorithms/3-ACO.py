import numpy as np, json

from algorithms import aco
from helpers import out, get_waypoints_raw, ids_to_route_and_geojson

"""
previous results:
n_ants=800, n_iterations=500, decay=0.7, alpha=2, beta=2
[33, 34, 58, 37, 42, 36, 40, 32, 30, 53, 55, 3, 6, 4, 0, 52, 54, 38, 25, 23, 28, 29, 27, 41, 19, 15, 20, 13, 14, 12, 17, 24, 39, 7, 5, 1, 2, 46, 8, 18, 10, 9, 31, 44, 57, 51, 43, 56, 50, 59, 16, 11, 48, 47, 45, 49, 21, 26, 22, 33]

"""


waypoints = np.array([tuple(i) for i in get_waypoints_raw()])

res = aco(waypoints, n_ants=800, n_iterations=500, decay=0.6, alpha=2, beta=2)


print('\n\n************* -------- MAIN ----- *****************')
print(res)

reformed, geojson = ids_to_route_and_geojson(res)

out(list(res), 'aco_route')