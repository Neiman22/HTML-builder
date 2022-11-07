const fs = require('fs');

fs.readdir('./secret-folder/', (err, files) => {
    for (i = 0; i < files.length; i++) {
        fileName = files[i].split('.')[0];
        fileExtension = files[i].split('.')[1];
        fileLocation = './secret-folder/' + files[i];
        let fileSize = 0;       
        fs.stat(fileLocation, (err, stats) => {
            fileSize = stats.size;
            console.log (fileSize);
        });
        console.log (`${fileName} - ${fileExtension} - ${fileSize}kb`);  
    }
})