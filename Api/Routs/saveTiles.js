
const fs = require('fs');
const path = require('path');
const rootFolder = '../data/tiles'; 

const {
    ParentFolder,
    SubparentFolder,
    Image,
} = require('../models/tiles')

/** saves iamges to mongo db with parent, subparent and images as structure */
const saveTilesFunction = async () => {
  const parentFolders = fs.readdirSync(rootFolder, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => document.name);

  for (const parentFolderName of parentFolders) {
    const newParentFolder = new ParentFolder({
      folderName: parentFolderName,
    });
    const savedParentFolder = await newParentFolder.save();


    const subparentFolders = fs.readdirSync(path.join(rootFolder, parentFolderName), { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const subparentFolderName of subparentFolders) {

      const newSubparentFolder = new SubparentFolder({
        folderName: subparentFolderName,
        parentFolder: savedParentFolder._id,
      });
      const savedSubparentFolder = await newSubparentFolder.save();


      const imageFiles = fs.readdirSync(path.join(rootFolder, parentFolderName, subparentFolderName));
      for (const fileName of imageFiles) {
        const imagePath = path.join(rootFolder, parentFolderName, subparentFolderName, fileName);
        const imageBuffer = fs.readFileSync(imagePath);


        const newImage = new Image({
          fileName,
          image: imageBuffer,
          subparentFolder: savedSubparentFolder._id,
        });
        await newImage.save();
      }
    }
  }

  console.log('YESSS !! Images => MongoDB!');
};

module.exports = saveTilesFunction