# TODO

## 1.2


## 1.3

- fix double nodes problem. Some streets are off the map as they contain nodes that 
    emerge in other streets as well. This is because we use an object with key:node and value:street_name.
    - opt1 . Different object KEY: optimally the key would be the node of that street, but than we need to *accuratly* pinpoint a
        moving vichicle to be in a certain street, which can be bothersome -> look at how gta did that.
    - opt3 . move duplicate coordinates slightly to make it unique. 
        - Problem: problem with detecting if Truck is at point a or b in street x or y.
    - opt3 . just iterate both points. This will require to restructure the system.
        Every Value to the Key will be an array of shared by others nodes of differnt ways/streets.
        - NOW: {"coord,inates": StreetData}
        - THEN:  {"coord,inates": [StreetData, StreetData...]}

- fix that every street has an even percentage that need to be loaded by subdeviding coordinates.
    As currently you might be at 0 and all of a sudden at 100% as the street only has two waypoints.
    - opt1 . make so that every streets has 100 (or n) nodes to be checked
    - opt2 . subdevide a street every n-steps


Possible solution may lie in using different queries.