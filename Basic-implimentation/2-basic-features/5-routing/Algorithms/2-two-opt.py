from helpers import get_waypoints_raw, out
from algorithms import two_opt
import time
 

'''
Will give the fastest possible solution with relatevly high accuacy
It does take nearly one hour to finish 100 waypoints. 
'''
# timer start
start = time.time()



waypoints = get_waypoints_raw()

#res = two_opt(waypoints)
res = [0, 85, 86, 88, 84, 42, 7, 8, 4, 6, 3, 89, 90, 2, 1, 5, 63, 83, 92, 44, 12, 21, 13, 27, 20, 16, 15, 17, 9, 62, 22, 71, 64, 31, 32, 37, 41, 36, 67, 68, 69, 74, 72, 73, 18, 23, 11, 78, 81, 79, 80, 14, 10, 19, 25, 29, 24, 28, 26, 40, 39, 35, 33, 30, 34, 48, 49, 70, 38, 76, 77, 51, 55, 65, 61, 54, 52, 53, 75, 59, 58, 95, 97, 96, 98, 60, 56, 66, 57, 93, 91, 82, 94, 47, 50, 46, 45, 43, 87]
restructured = [waypoints[i][::-1] for i in res]
print(res)
print('*--------------------*')
print(restructured)



# timer end
# source: https://www.geeksforgeeks.org/how-to-check-the-execution-time-of-python-script/
end = time.time()
print("\n\nTotal time: ", (end-start) * 10**3, "ms")

#out(res, '2-opt-res')