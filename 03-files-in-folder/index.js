const fs = require('fs');

fs.readdir('./secret-folder/',(err, files) => {
    for (let i = 0; i < files.length; i++) {
        folder = './secret-folder/' + files[i];
        fs.stat(folder, (err, stats) => {
            if (stats.isFile()) {
                console.log (`${files[i].split('.')[0]} - ${files[i].split('.')[1]} - ${stats.size} byte`);
            };
        })  
    }
})


