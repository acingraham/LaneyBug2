const fs = require('fs');

const arr = [];

fs.readdir('./videos/', (err, files) => {
  const data = files.map(file => `${file}`);

  fs.writeFile('videoList.json', JSON.stringify(files), err => {
    if (err) {
      console.error(err);
    }
  });

});


