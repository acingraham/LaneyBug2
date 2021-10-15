const fs = require('fs');
const videoListFilepath = '../../public/videoList.json';

fs.readdir('./videos/', (err, newFiles) => {
  fs.readFile(videoListFilepath, 'utf-8', (err, existingFilesJson) => {
    if (err) {
      console.error(err);
    }

    const existingFiles = JSON.parse(existingFilesJson);
    const allFilesSet = new Set(newFiles.concat(existingFiles));

    fs.writeFile(videoListFilepath, JSON.stringify(Array.from(allFilesSet)), err => {
      if (err) {
        console.error(err);
      }
    });
  });
});


