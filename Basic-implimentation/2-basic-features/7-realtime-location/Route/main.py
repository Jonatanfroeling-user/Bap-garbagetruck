import json, math, os, sys
import numpy as np

def toFixed(n):
    return "{:10.7f}".format(n)


def get_dis(a, b):
    return math.hypot(b[0] - a[0], b[1] - a[1])#sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)


# def get_pos_to(src, targ, dis):
#     dx = targ[0] - src[0]
#     dy = targ[1] - src[1]
#     ang = np.arctan2(dy, dx)
#     return [src[0] + dis * np.cos(ang), src[1] + dis * np.sin(ang)]

# def get_intermediate(a, b, steps=0.0001):
#     num_points = int(np.ceil(get_dis(a, b) / steps))
#     intermediate_points = np.linspace(a, b, num=num_points, endpoint=True)
#     intermediate_points_formatted = [[toFixed(coord) for coord in point] for point in intermediate_points]
#     return intermediate_points_formatted


# a lot faster than the js implimentation
def get_intermediates(coords_list, steps=0.00001):
    res = []
    for i in range(len(coords_list) - 1):
        a = coords_list[i]
        b = coords_list[i + 1]
        dis = get_dis(a, b)
        num_points = int(dis / steps) + 1
        x = np.linspace(a[0], b[0], num_points)
        y = np.linspace(a[1], b[1], num_points)
        intermediate_points = np.column_stack((x, y)).tolist()
        res.extend(intermediate_points[1:])
    return [[float(toFixed(j)) for j in i]for i in res]



if __name__:
    # get raw array of data
    with open('Basic-implimentation/data/Routes/route-ronse-center.json') as f:
        raw = json.load(f)
        # apply intermediate
        final = get_intermediates(raw)
        # output data in json format #os.path.dirname(sys.argv[0])
        with open('Basic-implimentation/data/RealTimeLocation/intermediated.json', "w") as o:
            json.dump(final, o)
        
    print('done!')




        

