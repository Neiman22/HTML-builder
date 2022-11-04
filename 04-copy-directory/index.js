const fs = require('fs');
const dirCopy = './files-copy/';
fs.mkdir(dirCopy, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir('./files/',(err, files) => {
        for (let i = 0; i < files.length; i++) {
            src = './files/' + files[i];
            dest = './files-copy/' + files[i];
            fs.copyFile (src, dest, () => {})
        }
    });   
});
