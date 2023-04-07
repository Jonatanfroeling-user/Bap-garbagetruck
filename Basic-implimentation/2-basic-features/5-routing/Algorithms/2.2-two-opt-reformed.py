from helpers import get_waypoints_raw, out, get_waypoints_reversed, get_waypoints_parts, flatten

'''
Will give the fastest possible solution with relatevly high accuacy
It does take nearly one hour to finish 100 waypoints. 
'''


''' 1. apply 2-opt '''
# retrieve raw coordinates from waypoints
waypoints_raw = get_waypoints_raw()
# Two-opt algorithm results
res = [0, 85, 86, 88, 84, 42, 7, 8, 4, 6, 3, 89, 90, 2, 1, 5, 63, 83, 92, 44, 12, 21, 13, 27, 20, 16, 15, 17, 9, 62, 22, 71, 64, 31, 32, 37, 41, 36, 67, 68, 69, 74, 72, 73, 18, 23, 11, 78, 81, 79, 80, 14, 10, 19, 25, 29, 24, 28, 26, 40, 39, 35, 33, 30, 34, 48, 49, 70, 38, 76, 77, 51, 55, 65, 61, 54, 52, 53, 75, 59, 58, 95, 97, 96, 98, 60, 56, 66, 57, 93, 91, 82, 94, 47, 50, 46, 45, 43, 87]
res = [0, 52, 54, 40, 2, 1, 5, 39, 7, 51, 9, 24, 17, 13, 12, 14, 19, 15, 20, 41, 27, 29, 28, 22, 26, 21, 25, 23, 38, 16, 11, 48, 47, 45, 49, 46, 8, 18, 10, 31, 57, 44, 56, 43, 50, 59, 34, 35, 33, 58, 37, 42, 36, 32, 30, 53, 55, 3, 6, 4]
print('*---------- 2-opt ----------*')
print(res)



''' 2. restructure '''
# get the original coordinates back
restructured = [waypoints_raw[i] for i in res]
# NOTE: for testing in eg. geojson.iom you need to reverse the choords
# purpose so we dont end up at the horn of africa (not a joke)
#restructured = [i[::-1] for i in restructured]
print('\n*---------- restructured ----------*')
print(restructured)



''' 3. retrieve original ids of parts of streets now in correct order '''
# reverse the process to gain the ID's of each part
waypoints_reversed = get_waypoints_reversed()
part_ids = [waypoints_reversed[str(i)] for i in restructured]
print('\n*---------- part ids ----------*')
print(part_ids)



''' 4. restructure original json, using the ids create a new street data json file, this time in correct order '''
# reverse the process to gain the ID's of each part
final = []
geojson_test = []

parts = get_waypoints_parts()

for id in part_ids:
    final.append(parts[id])
    geojson_test.append([i[::-1] for i in parts[id]['coords']])

# flatten geojson
geojson_test = flatten(geojson_test)
        
print('\n*---------- FINAL ----------*')
print(final)
        
print('\n*---------- geojson ----------*')
print(geojson_test)




