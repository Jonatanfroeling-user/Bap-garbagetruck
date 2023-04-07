import numpy as np, json

from algorithms import aco
from helpers import out, get_waypoints_raw



waypoints = np.array([tuple(i) for i in get_waypoints_raw()])

best_path = aco(waypoints, n_ants=800, n_iterations=500, decay=0.7, alpha=2, beta=2)


print('\n\n************* -------- MAIN ----- *****************')
print(best_path)
out(json.dumps(best_path), 'aco_best')
# Plot best path
x = waypoints[:, 0]
y = waypoints[:, 1]

print('\n\n************* --------X----- *****************')
print(x)
print('\n\n************* --------y----- *****************')
print(y)