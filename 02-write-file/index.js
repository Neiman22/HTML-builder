const { stdin, stdout } = process;
const fs = require('fs');
const path = require ('path');
const filePath = path.join(__dirname, 'destination.txt');
const output = fs.createWriteStream(filePath);

stdout.write('Ввведите текст, если хотите выйти нажмите Ctrl+C или введите exit: ');
stdin.on('data', data => {
    const dataStringified = data.toString();
    if (dataStringified.trim() === 'exit') {
        stdout.write('До свидания!\n');
        process.exit();
    } else {
        output.write(dataStringified);
        stdout.write('Ввведите еще текст, если хотите выйти нажмите Ctrl+C или введите exit: ');
    }
});
process.on ('SIGINT', () => {
    stdout.write('\nДо свидания!\n');
    process.exit();
})

