const fs = require('fs');
const path = require ('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;


    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
            if (err) throw err;
            let re = /(?<={{)\w+(?=}})/g;
            let arraySection = data.match(re);
            
            for (let i = 0; i < arraySection.length; i++) {
                let replaceString = `{{${arraySection[i]}}}`;
                let replaceFile = arraySection[i] + '.html';
                const input = fs.createReadStream(path.join(__dirname, 'components', replaceFile));
                input.on ('data', dataFiles => {
                        data = data.replace(replaceString, dataFiles);
                            const output = fs.createWriteStream(path.join(__dirname, '/project-dist/index.html'));
                            output.write(data.toString() + '\n');                      
                }); 
            }
    });
    

    
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if (err) throw err;
        const output = fs.createWriteStream(path.join(__dirname, '/project-dist/style.css'));
        fs.readdir(path.join(__dirname, 'styles'),(err, files) => {
            for (let i = 0; i < files.length; i++) {
                fs.stat(path.join(__dirname, 'styles', files[i]), (err, stats) => {
                    if (stats.isFile()) {
                        if (files[i].split('.')[1] === "css"){
                                const input = fs.createReadStream(path.join(__dirname, 'styles', files[i]));
                                input.on ('data', data => {
                                    output.write(data.toString() + '\n')
                                })
                        }                
                    };
                })
            }
        });
    });

    fs.rm (path.join(__dirname, 'project-dist', 'assets'), { recursive:true }, (err) => { 
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
            if (err) throw err;
            const directoryCopy = path.join (__dirname, 'assets');
            const directoryDest = path.join (__dirname, 'project-dist', 'assets');
            function copyFiles (dirCopy, dirDest) {
                fs.readdir(dirCopy,(err, files) => {
                    for (let i = 0; i < files.length; i++) {
                        fs.stat(path.join(dirCopy, files[i]), (err, stats) => {
                            if (stats.isFile()) {
                                src = path.join (dirCopy, files[i]);
                                dest = path.join (dirDest, files[i]);
                                fs.copyFile (src, dest, () => {})
                            } else {                         
                                newDirCopy = path.join(dirCopy, files[i]);
                                newDirDest = path.join(dirDest, files[i]);
                                fs.mkdir(newDirDest, { recursive: true }, err => {
                                    if (err) throw err;
                                });
                                copyFiles (newDirCopy, newDirDest);
                            }
                        });
                    }
                });
            }
            copyFiles (directoryCopy, directoryDest);
        });
    });

});







