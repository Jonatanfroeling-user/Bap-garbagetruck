const ObjectId = require('mongodb').ObjectId;


// models
const Street = require('../models/street');
const Route = require('../models/route');
const RealTimeLocation = require('../models/realtimeLocation');

// raw data
const rawMapData = require('../data/mapData.json');
const rawLocationData = require('../data/realtimeLocation.json');
const rawRouteData = require('../data/routeRonse.json');


const saveTilesFunction = require('./saveTiles')

const {ParentFolder,SubparentFolder,Image, } = require('../models/tiles')

function registerRoutes(app) {
    // init mongo db data from ./data/..
    app.get('/initdata', async (req, res) => {
        try {
            // check init status
            if(await Street.findOne()) {
                console.log('already inited')
                res.status(200).json('already inited');
                return
            }

            console.time('init-data')
            // save streets
            for(let [name, rawStreet] of Object.entries(rawMapData)) {
                const street = new Street(rawStreet);
                await street.save();
            }

            // save route
            const newRoute = new Route({coordinates: rawRouteData});
            await newRoute.save();
  

            // save real time locations
            const locations = new RealTimeLocation({coordinates: rawLocationData });
            await locations.save();

            // saves tiles
            await saveTilesFunction()

            console.timeEnd('init-data')
            res.status(200).json({'message':'Succcesss!'});
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        
      });
      





    /** Test routes */
    app.get('/test', async (req, res) => {
        try {
        res.status(200).json({'message':'TEST'});
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });
    app.post('/test', async (req, res) => {
        try {
        res.status(200).json({'message':'test data'});
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });







    /** Downloads */
    app.post('/downloads/map/ronse', async (req, res) => {
        try {
            const query = Street.find({})
            const data = await query.exec()

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/downloads/fakelocations/ronse', async (req, res) => {
        try {
            const query = RealTimeLocation.find({})
            const data = await query.exec()

            res.status(200).json(data);
        } catch (error) {

            res.status(500).json({ error: error.message });
        }
    });

    app.post('/downloads/route/ronse', async (req, res) => {
        try {
            const query = Route.find({})
            const data = await query.exec()

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    app.post('/downloads/offlineroute/ronse', async (req, res) => {
        try {
          // validate id of current route tiles
          const {_id:validationId} = await ParentFolder.findOne({});
          const validateParentId = validationId.valueOf()
          // is already up to date
          if(req.body.tile_id === validateParentId) {
            res.json({
              message: "noupdate",
              images: [],
              id: validationId
            });
            return
          }

          const parentFoldersRaw = await ParentFolder.find({});
          const subParentFoldersRaw = await SubparentFolder.find({});
          const images = await Image.find({});

          // structure as objects so less db calls are required
          const _parentFolders = {}
          const _subParentFolders = {}
        
          for(let i of parentFoldersRaw) _parentFolders[i['_id']] = i
          for(let i of subParentFoldersRaw) _subParentFolders[i['_id']] = i
          
          // rebuidl tile structure
          const responseData = [];
  
          // Loop through the images and group them by their folders
          for(let image of images) {
            const { subparentFolder:subParentId, fileName } = image;

            const subparentFolder = _subParentFolders[subParentId]
            const parentFolder = _parentFolders[subparentFolder['parentFolder']]

            const pathName = `${parentFolder.folderName}_${subparentFolder.folderName}_${fileName}`
            responseData.push({
              pathName,
              imageUrl: `data:image/jpeg;base64,${image.image.toString('base64')}`
            })
          }
          // send res
      
          res.json({
            message: "newdata",
            images: responseData,
            id: validateParentId,
          });


        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error retrieving images from database' });
        }
      });
      
}


module.exports = registerRoutes