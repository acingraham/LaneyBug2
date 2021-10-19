const fs = require('fs');
const videoListFilepath = '../../public/videoList.json';

// TODO - Have this pull from s3 rather than the local file system

// Get all videos filenames in local './videos' directory
fs.readdir('./videos/', (err, newFiles) => {

  // Get all video filenames in videoList.json
  fs.readFile(videoListFilepath, 'utf-8', (err, existingFilesJson) => {
    if (err) {
      console.error(err);
    }

    const existingFiles = JSON.parse(existingFilesJson);
    const allFilesSet = new Set(newFiles.concat(existingFiles));

    // Write all video filenames to videoList.json
    fs.writeFile(videoListFilepath, JSON.stringify(Array.from(allFilesSet)), err => {
      if (err) {
        console.error(err);
      }
    });
  });
});
