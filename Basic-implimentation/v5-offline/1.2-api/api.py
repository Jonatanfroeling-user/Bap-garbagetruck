from fastapi import APIRouter, Response, Request, HTTPException

app=APIRouter()

## admins can add new avalable routes here
TileZipDictionary={
    "route-x": 'Basic-implimentation/v6-api/route-x-zipped.zip'
}


def getZipById(id,response):
    path=None
    for key, val in TileZipDictionary.items():
        if key==id:
            path=val
            break
    else:
        return {'message':'no route not found for this id', 'code':404}

    with open(path, mode='rb') as file:
        contents = file.read()

    response.headers['Content-Disposition'] = 'attachment; filename=files.zip'
    return Response(contents, media_type='application/zip')


# define a route group routes
@app.get('/download')
async def get_list():
    return {'message': 'List of all avalable downloads', 
            'payload': list(TileZipDictionary.values())}

# download specific route
@app.get('/download/map/{route_id}')
async def get_route_map(response: Response, route_id: str):
    return getZipById(route_id, response)



if __name__ == '__main__':
    import uvicorn
    #192.168.0.120
    uvicorn.run(app, host="localhost", port=8080)
