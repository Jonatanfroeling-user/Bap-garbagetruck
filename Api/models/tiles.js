const mongoose = require('mongoose');

const parentFolderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
  },
});

const subparentFolderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentFolder',
    required: true,
  },
});

const imageSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  subparentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubparentFolder',
    required: true,
  },
});



const ParentFolder = mongoose.model('ParentFolder', parentFolderSchema);
const SubparentFolder = mongoose.model('SubparentFolder', subparentFolderSchema);
const Image = mongoose.model('Image', imageSchema);


module.exports = {
    ParentFolder,
    SubparentFolder,
    Image,
}