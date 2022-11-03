const fs = require('fs');

fs.stat(`./secret-folder/script.js`, (err, stats) => {
    console.log (stats.size);
});

fs.readdir('./secret-folder', (err, files) => {
    
    for (i = 0; i < files.length; i++) {
        fileName = files[i].split('.')[0];
        fileExtension = files[i].split('.')[1];
        folder = `./secret-folder/${files[i].toString()}`;
        console.log (folder);
        fileSize = fs.stat(folder, (err, stats) => {
            stats.size;
        });
        console.log (`${fileName} - ${fileExtension} - ${fileSize}kb`);
    }
})
