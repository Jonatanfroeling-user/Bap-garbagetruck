"""
@concept: tonyrewin https://gist.github.com/tonyrewin/9444410


"""
#!/usr/bin/python3

import os, sys, time, math, urllib3, shutil
http = urllib3.PoolManager()

## faster but no bulk donwload allowed
BASE_URL= 'http://c.tile.openstreetmap.org'
## slower but more easy access
#BASE_URL = 'https://basemaps.cartocdn.com/light_all'


def deg2num(lat_deg, lon_deg, zoom):
    lat_rad = math.radians(lat_deg)
    n = 2.0 ** zoom
    xtile = int((lon_deg + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.log(math.tan(lat_rad) + (1 / math.cos(lat_rad))) / math.pi) / 2.0 * n)
    return (xtile, ytile)

def download_url(zoom, xtile, ytile):
    url = BASE_URL+"/%d/%d/%d.png" % (zoom, xtile, ytile)
    dir_path = "tiles/%d/%d/" % (zoom, xtile)
    download_path = "tiles/%d/%d/%d.png" % (zoom, xtile, ytile)

    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
    
    if(not os.path.isfile(download_path)):
        with open(download_path, 'wb') as out:
            r = http.request('GET', url, preload_content=False)
            shutil.copyfileobj(r, out)
    return download_path


def main():
    # ronse route - center
    lat = 50.7431
    lon = 3.6222

    minzoom = 15 # complete area
    maxzoom = 17 # zoom to: street name, small streets
    
    # download progress
    progressTotal=0
    progress = 0
    


    # custom maade stuout progress bar
    def printProgress(percent, message=''):
        sys.stdout.write('\r{}%  {}'.format(percent, message))
        sys.stdout.flush()
        

    # get total download length to see progresss
    for zoom in range(minzoom, int(maxzoom)+1, 1):
        xtile, ytile = deg2num(float(lat)-0.1, float(lon)-0.05, zoom)
        final_xtile, final_ytile = deg2num(float(lat)+0.1, float(lon)+0.05, zoom)
        for x in range(xtile, final_xtile + 1, 1):
            for y in range(ytile, final_ytile - 1, -1):                
                progressTotal+=1
                

    if input('size:{} - total:{} - Continue? y/n\n'.format(str(progressTotal*20), progressTotal)) != 'y':
        exit()

    res = []
    for zoom in range(minzoom, int(maxzoom)+1, 1):
        xtile, ytile = deg2num(float(lat)-0.1, float(lon)-0.05, zoom)
        final_xtile, final_ytile = deg2num(float(lat)+0.1, float(lon)+0.05, zoom)
        #print("%d:%d-%d/%d-%d" % (zoom, xtile, final_xtile, ytile, final_ytile))
        
        res_row = []
        for x in range(xtile, final_xtile + 1, 1):
            res_col = []
            for y in range(ytile, final_ytile - 1, -1):
                printProgress(math.floor((progress+1)/progressTotal *100), "zoom:%d - at:%d-%d/%d-%d - x:%d, y:%d" % (zoom, xtile, final_xtile, ytile, final_ytile,x,y))
                progress+=1
                #time.sleep(0.01)
                path = download_url(zoom, x, y)
                res_col.append(path)
            res_row.append(res_col)
        res.append(res_row)
    return res
    
main() 