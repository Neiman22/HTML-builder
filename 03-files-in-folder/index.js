const fs = require('fs');
const path = require ('path');
const dirPath = path.join(__dirname, '/secret-folder/');

fs.readdir(dirPath,(err, files) => {
    for (let i = 0; i < files.length; i++) {
        folder = path.join(dirPath, files[i]);
        fs.stat(folder, (err, stats) => {
            if (stats.isFile()) {
                console.log (`${files[i].split('.')[0]} - ${files[i].split('.')[1]} - ${stats.size} byte`);
            };
        })  
    }
})


