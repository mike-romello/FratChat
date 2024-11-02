const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const masterFile = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'master.json');

const readJsonFilesRecursively = (dir) => {
    let data = {};
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            data[file] = readJsonFilesRecursively(filePath);
        } else if (path.extname(file) === '.json') {
            const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const fileName = path.basename(file, '.json');
            data[fileName] = fileData;
        }
    });

    return data;
};

const masterData = readJsonFilesRecursively(contentDir);

fs.writeFileSync(masterFile, JSON.stringify(masterData, null, 2), 'utf8');
console.log('All JSON files have been merged into master.json');
