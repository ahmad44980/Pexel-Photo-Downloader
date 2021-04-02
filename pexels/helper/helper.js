const { DownloaderHelper } = require('node-downloader-helper');
const fetch = require("node-fetch");
var fs = require('fs');
const chalk = require('chalk');

var dir = './result';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

function formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

module.exports.getPhotos = function(images) {
    var k = 0;
    images.map(image => {
        var url = image.src.large;

        const dl = new DownloaderHelper(url, dir);
        k = k + 1;

        dl
            .on('download', downloadInfo => console.log('Downloading:', {
                name: downloadInfo.fileName,
                size: formatBytes(downloadInfo.totalSize)
            }))
            .on('end', downloadInfo => console.log(chalk.green(downloadInfo.fileName), 'downloaded successfully'))

        dl.start();

    })
    console.log('Total Files Downloaded: ', k);
}