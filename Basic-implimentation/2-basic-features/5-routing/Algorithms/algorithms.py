from helpers import get_dis, get_path_length, printProgress, toFixed
import random, datetime, time
import numpy as np
from itertools import permutations


'''
All basic implimentations of the algorithms we culd use for this project

'''

## traveling postman problem algorithm (find shortest path that visits every waypoint exactly once)
# takes too long for testing as: 10 waypoints are already 3628800 calculations
def tsp(waypoints, debug=True):
    if len(waypoints)>20:
        print("this will take years..")
        exit()
    # gen all possible permutations (of waypoints)
    perms = permutations(range(len(waypoints)))


    # calculate length of each permutation & return the shortest
    shortest = None
    dev=0
    for perm in perms:
        dev+=1
        if debug and dev % len(waypoints):
            printProgress(dev, len(waypoints)**len(waypoints), 'permutations')

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
    print('none found..')
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
        if stop_infinite > 1000000:
            print('Possible infinte loop, quitting.')
            return best_route
        elif stop_infinite%100==0:
            print(stop_infinite)
            
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



"""ACO

Arguments:
    The number of ants should generally be proportional to the number of waypoints. A common rule of thumb is to use between 5 and 10 ants per waypoint. 
    For 100 waypoints, a reasonable range might be 500 to 1000 ants.

    The number of iterations should be high enough to allow the ants to explore the search space thoroughly, but not so high that the algorithm becomes too slow. 
    A common value is between 100 and 1000 iterations.

    The decay rate determines how quickly the pheromone evaporates over time. A high decay rate will cause the algorithm to converge faster, 
    but may cause premature convergence to suboptimal solutions. 
    A low decay rate will allow more exploration of the search space, but may require more iterations to converge. A common value is between 0.1 and 0.5.

    The alpha and beta parameters control the relative importance of pheromone and distance in the ants' decision-making. 
    A high alpha value will favor pheromone trails, while a high beta value will favor shorter distances. A common value is between 1 and 5 for each parameter.


Returns:
    list: iterated index of inputted waypoints
"""
# https://github.com/PelayoChoya/ACO_path_planning
import numpy as np
import random

def get_path_length(start, end, waypoints):
    # adds small number in case of 0
    return np.sqrt(np.sum((waypoints[start] - waypoints[end])**2)) + 1e-6

class Ant:
    def __init__(self, pheromone, alpha, beta):
        self.pheromone = pheromone
        self.alpha = alpha
        self.beta = beta
        self.path = []
        self.path_length = 0

    def move(self, waypoints, distances):
        current = random.randint(0, len(waypoints)-1)
        visited = [current]

        while len(visited) < len(waypoints):
            unvisited = [i for i in range(len(waypoints)) if i not in visited]
            probs = self.pheromone[current, unvisited] ** self.alpha * \
                (1 / distances[current, unvisited]) ** self.beta
            probs = probs / np.sum(probs)

            next_waypoint = np.random.choice(unvisited, p=probs)
            self.path_length += distances[current, next_waypoint]
            visited.append(next_waypoint)
            self.path.append(next_waypoint)
            current = next_waypoint

        self.path_length += distances[current, self.path[0]]
        self.path.append(self.path[0])



def aco(waypoints, n_ants=10, n_iterations=100, decay=0.5, alpha=1, beta=1, progress=True):
    startTime= datetime.datetime.now()
    if progress:
        print('started:', startTime)
        print('config:', 'n_ants:'+str(n_ants), 'n_iterations:'+str(n_iterations), 'decay:'+str(decay), 'alpha:'+str(alpha), 'beta:'+str(beta), 'progress:'+str(progress))
    #  waypoints to np array for better performance
    waypoints = np.array(waypoints)

    # precompute distances between waypoints to avoid repeated computations
    distances = np.zeros((len(waypoints), len(waypoints)))
    for i in range(len(waypoints)):
        for j in range(i+1, len(waypoints)):
            distances[i, j] = distances[j, i] = get_path_length(i, j, waypoints)

    # init pheromone
    pheromone = np.ones((len(waypoints), len(waypoints)))
    pheromone *= 0.1 / np.mean(pheromone)

    itertimer = time.time()
    for i in range(n_iterations):
        # dev, print progress
        if progress:
            printProgress(i, n_iterations, 'sec:'+str(toFixed(itertimer - time.time())))
            itertimer = time.time()
            
            
        ants = [Ant(pheromone, alpha, beta) for _ in range(n_ants)]

        for ant in ants:
            #printProgress(ants.index(ant), n_ants, 'ant-move')
            ant.move(waypoints, distances)

        pheromone *= decay

        for ant in ants:
            #printProgress(ants.index(ant), n_ants, 'ant-calc')
            path = ant.path
            path_length = ant.path_length
            for j in range(len(path)-1):
                pheromone[path[j], path[j+1]] += 1 / path_length
                pheromone[path[j+1], path[j]] += 1 / path_length
        


    best_path = max(ants, key=lambda x: x.path_length).path
    if progress:
        print('done at:', datetime.datetime.now())
    return best_path
