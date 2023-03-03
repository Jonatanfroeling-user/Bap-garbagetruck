const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function extractZip(zipPath, extractPath) {
  const unzipStream = zlib.createUnzip();
  const readStream = fs.createReadStream(zipPath);
  const writeStream = fs.createWriteStream(path.join(extractPath, 'output.zip'));

  readStream.pipe(unzipStream).pipe(writeStream);

  writeStream.on('close', () => {
    console.log(`Zip file '${zipPath}' extracted successfully to '${extractPath}'.`);
  });
}

// Example usage:
const zipPath = '/path/to/zip/file.zip';
const extractPath = '/path/to/extract/folder';
extractZip(zipPath, extractPath);