const fs = require('fs');
const path = require ('path');
const dirCopy = path.join(__dirname, '/files/');
const dirDest = path.join(__dirname, '/files-copy/');

fs.rm (dirDest, { recursive:true }, (err) => {
    if (err) throw err;
    fs.mkdir(dirDest, { recursive: true }, (err) => {
        if (err) throw err;
        fs.readdir(dirCopy,(err, files) => {
            for (let i = 0; i < files.length; i++) {
                src = dirCopy + files[i];
                dest = dirDest + files[i];
                fs.copyFile (src, dest, () => {})
            }
        });   
    });
});

