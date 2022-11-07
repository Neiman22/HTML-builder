const fs = require('fs');
const path = require ('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
    console.log('Папка project-dist была создана');

    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
        if (err) throw err;
        console.log('Файл index.html был создан');

        const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => {
            function replaceTags (template){
                
              
                console.log(template.match(re));
            }
            replaceTags (data);
            fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), data, err => {
                    if (err) throw err;   
                }
            );
        });
        stream.on('error', error => console.log('Error', error.message));
    });

    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if (err) throw err;
        console.log('Файл style.css был создан');
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

    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
        if (err) throw err;
        console.log('Папка assets была создана');
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







