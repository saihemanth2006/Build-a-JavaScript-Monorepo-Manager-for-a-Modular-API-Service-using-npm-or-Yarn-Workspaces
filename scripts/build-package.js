const fs = require('node:fs');
const path = require('node:path');

const packagePath = process.cwd();
const sourcePath = path.join(packagePath, 'src');
const outputPath = path.join(packagePath, 'dist');

fs.rmSync(outputPath, { recursive: true, force: true });
fs.cpSync(sourcePath, outputPath, { recursive: true });