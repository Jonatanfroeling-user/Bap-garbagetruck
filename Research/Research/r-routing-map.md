Games: https://www.crazygames.com/game/real-garbage-truck
nope

Similar: https://iot4beginners.com/route-planning-for-garbage-collection-with-iot-part-1/
python, interesting, uses google, but no refficient routing.




## Software for developers

https://gis-ops.com/open-source-routing-engines-and-algorithms-an-overview/
*Originally a Mapzen [RIP] project, Mapbox took the chance to hire most of its engineers to evolve Valhalla further (and shortly after it dropped OSRM maintenance). Around the same time Tesla chose Valhalla as their in-car navigation system due to its favorable runtime requirements and its unique flexibility in runtime costing of road segments. One of the main advantages of Valhalla is that all profiles use the same graph, which is made possible by its dynamic runtime costing (eeeh?! 😀 you can influence the route finding with many custom factors/penalties/costs, e.g. avoid highways).*


https://angular-ui.github.io/angular-google-maps/#!/demo
Angular with google Maps. 
Pro: Open source. Gives the option to add polygons which could be usefull to mark certain areas.
Con: Not a lot of documentation or reviews. Last update was 6 years ago.




## Algorithm
I'm not aware of any specific open-source platform that is currently used by existing garbage truck 
companies for route optimization and management. However, there are several open-source routing 
libraries and frameworks available that can be used to build such a platform. One example is the OpenRouteService API, 
which is an open-source routing engine that can be used to calculate optimal routes for various types of vehicles, 
including garbage trucks. Another example is the OpenTripPlanner, which is an open-source multi-modal trip planning platform. 
Both of these are built on open-source libraries such as GraphHopper and OpenStreetMap, 
and can be integrated with other open-source technologies such as web mapping libraries like Leaflet or OpenLayers, 
and web frameworks like Flask or Django.






### What would be a good routing algorithm for a platform for the driver of a garbage truck?

A good routing algorithm for a platform for the driver of a garbage truck would likely be a variant of the travelling salesman problem (TSP) or vehicle routing problem (VRP). These algorithms are designed to find the most efficient route that visits a set of locations while minimizing the total distance or time traveled. Some popular algorithms for solving TSP and VRP include the Clarke-Wright savings algorithm, the Christofides algorithm, and the Ant Colony Optimization algorithm. Additionally, machine learning techniques such as neural networks and genetic algorithms could also be used to improve the performance of these routing algorithms.

/Users/jonatansurname/miniconda3/lib/python3.10/site-packages/networkx/algorithms/shortest_paths



[types](https://desktop.arcgis.com/en/arcmap/latest/extensions/network-analyst/algorithms-used-by-network-analyst.htm)
General, all types of algorythms

https://developers.google.com/optimization/routing/tsp#python_1
Routing opmisation 

*give my a javascript implementation of the TSP algorithm*

Here is an example of the Traveling Salesman Problem (TSP) algorithm implemented in JavaScript:
``` js

function TSP(cities) {
  var permutations = permute(cities);
  var shortestDistance = Number.MAX_SAFE_INTEGER;
  var shortestRoute;
  for (var i = 0; i < permutations.length; i++) {
    var permutation = permutations[i];
    var distance = calculateDistance(permutation);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      shortestRoute = permutation;
    }
  }
  return {
    route: shortestRoute,
    distance: shortestDistance
  };
}

function permute(input) {
  var permutations = [];
  for (var i = 0; i < input.length; i++) {
    var rest = permute(input.slice(0, i).concat(input.slice(i + 1)));
    if (!rest.length) {
      permutations.push([input[i]])
    } else {
      for (var j = 0; j < rest.length; j++) {
        permutations.push([input[i]].concat(rest[j]))
      }
    }
  }
  return permutations;
}

function calculateDistance(route) {
  var distance = 0;
  for (var i = 0; i < route.length - 1; i++) {
    distance += getDistanceBetweenCities(route[i], route[i + 1]);
  }
  return distance;
}

function getDistanceBetweenCities(city1, city2) {
  // Use the Haversine formula to calculate the distance between two cities
  var latitude1 = city1.latitude;
  var longitude1 = city1.longitude;
  var latitude2 = city2.latitude;
  var longitude2 = city2.longitude;
  var R = 6371; // Earth's radius in kilometers
  var dLat = (latitude2 - latitude1) * (Math.PI / 180);
  var dLon = (longitude2 - longitude1) * (Math.PI / 180);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

```


This code uses a brute force algorithm to calculate the shortest route by checking all possible permutations of the cities. The `permute` function is used to generate all possible permutations of the cities, and the `calculateDistance` function is used to calculate the total distance of each permutation. The final result is the permutation with the shortest distance.

Keep in mind that this is just one of many algorithms that could be used to solve the TSP problem, and it may not be the best choice for your use case. Also, this code is an example and needs to be adapted to your
