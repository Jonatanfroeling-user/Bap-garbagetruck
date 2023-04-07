from helpers import get_dis, get_path_length
import random
import numpy as np
from itertools import permutations


'''
All basic implimentations of the algorithms we culd use for this project

'''

## traveling postman problem algorithm (find shortest path that visits every waypoint exactly once)
# takes too long for testing as: 10 waypoints are already 3628800 calculations
def tsp(waypoints, debug=True):
    # gen all possible permutations (of waypoints)
    perms = permutations(range(len(waypoints)))
    # print(list(perms))
    # return 
    # calculate length of each permutation & return the shortest
    shortest = None
    dev=0
    for perm in perms:
        dev+=1
        if debug and dev % len(waypoints):
            print(str(dev)+'/'+str(len(waypoints)**len(waypoints)) + ' permutations')
        length = get_path_length(perm, waypoints)
        if shortest is None or length < get_path_length(shortest, waypoints):
            shortest = perm
    return shortest



## depth-first which adds backtracking to TSP path to account for dead ends
def dfs(path, waypoints, visited, current):
    # in case we visited every waypoint, DONE :)
    if len(visited) == len(waypoints):
        return path
    for i in range(len(waypoints)):
        if i not in visited and get_dis(waypoints[current], waypoints[i]) < 200: # optional: only search in area of x
            visited.add(i)
            path.append(i)
            res = dfs(path, waypoints, visited, i)
            if res is not None:
                return res
            path.pop()
            visited.remove(i)
    return None
 
 
 
# https://en.wikipedia.org/wiki/Nearest_neighbour_algorithm
def nearest_neighbor(waypoints):
    remaining = set(range(len(waypoints)))
    current = 0
    path = [current]
    remaining.remove(current)
    while remaining:
        nearest = min(remaining, key=lambda x: get_dis(waypoints[current], waypoints[x]))
        path.append(nearest)
        remaining.remove(nearest)
        current = nearest
    return path



# https://en.wikipedia.org/wiki/2-opt
# uses slicing to reverse the order of a subsequence of the route
def two_opt(coords):
    best_route = list(range(len(coords)))

    # loop until no further improvements can be made
    # can take a while...
    improvement = True
    stop_infinite = 0
    while improvement:
        improvement = False
        stop_infinite += 1
        if stop_infinite > 100000:
            print('Possible infinte loop, quitting.')
            return best_route
        for i in range(1, len(coords) - 2):
            for j in range(i + 1, len(coords)):
                if j - i == 1:
                    continue
                # calculate distance of current route
                curr_distance = (
                    get_dis(coords[best_route[i-1]], coords[best_route[i]]) + 
                    get_dis(coords[best_route[j]], coords[best_route[(j+1)%len(coords)]]) +
                    get_dis(coords[best_route[j-1]], coords[best_route[i-1]]) + 
                    get_dis(coords[best_route[j]], coords[best_route[i]])
                )
                # calculate distance for the new route (after swapping)
                new_distance = (
                    get_dis(coords[best_route[i-1]], coords[best_route[j]]) + 
                    get_dis(coords[best_route[i]], coords[best_route[(j+1)%len(coords)]]) +
                    get_dis(coords[best_route[j-1]], coords[best_route[i]]) + 
                    get_dis(coords[best_route[j]], coords[best_route[i-1]])
                )
                if new_distance < curr_distance:
                    # if new route is shorter, update  best route
                    best_route[i:j+1] = best_route[i:j+1][::-1]
                    improvement = True

    ordered_coords = [{"order": i, "coordinate": coords[best_route[i]]} for i in range(len(coords))]
    return ordered_coords




# https://github.com/PelayoChoya/ACO_path_planning
def aco(waypoints, n_ants=10, n_iterations=100, decay=0.5, alpha=1, beta=1):
    pheromone = np.ones((len(waypoints), len(waypoints)))
    pheromone *= 0.1 / np.mean(pheromone)

    for i in range(n_iterations):
        ants = [Ant(pheromone, alpha, beta) for _ in range(n_ants)]

        for ant in ants:
            ant.move(waypoints)

        pheromone *= decay

        for ant in ants:
            path = ant.path
            path_length = 0
            for j in range(len(path)-1):
                pheromone[path[j], path[j+1]] += 1 / path_length
                pheromone[path[j+1], path[j]] += 1 / path_length

    best_path = max(ants, key=lambda x: x.path_length).path
    return best_path

class Ant:
    def __init__(self, pheromone, alpha, beta):
        self.pheromone = pheromone
        self.alpha = alpha
        self.beta = beta
        self.path = []
        self.path_length = 0

    def move(self, waypoints):
        current = random.randint(0, len(waypoints)-1)
        visited = [current]

        while len(visited) < len(waypoints):
            unvisited = [i for i in range(len(waypoints)) if i not in visited]
            probs = self.pheromone[current, unvisited] ** self.alpha * \
                (1 / get_path_length(current, unvisited, waypoints)) ** self.beta
            probs = probs / np.sum(probs)

            next_waypoint = random.choices(unvisited, probs)[0]
            self.path_length += get_path_length(current, [next_waypoint], waypoints)
            visited.append(next_waypoint)
            self.path.append(next_waypoint)
            current = next_waypoint

        self.path_length += get_path_length(current, [self.path[0]], waypoints)
        self.path.append(self.path[0])

