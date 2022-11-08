const fs = require('fs');
const path = require ('path');
const dirStyles = path.join(__dirname, '/styles/');
const dirDest = path.join(__dirname, '/project-dist/bundle.css');
const output = fs.createWriteStream(dirDest);

fs.readdir(dirStyles,(err, files) => {
    for (let i = 0; i < files.length; i++) {

        fs.stat(path.join(dirStyles, files[i]), (err, stats) => {
            if (stats.isFile()) {
                if (files[i].split('.')[1] === "css"){
                        const input = fs.createReadStream(path.join(dirStyles, files[i]));
                        input.on ('data', data => {
                            output.write(data.toString() + '\n');
                        })
                }                
            };
        })
    }
});
