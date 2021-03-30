const { DownloaderHelper } = require('node-downloader-helper');
const fetch = require("node-fetch");
var fs = require('fs');
const pkg = require('../package.json');
const secrets = require('./secrets');

var i = 0;
var k = 0;
var dir = './result';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}


readline.question('Search Photos: ', search => {
    readline.question('Total Photos?  ', total => {
        if (total != '' || total != 0) {
            i = i + 1;
            fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=${total}&page${i}`, {
                    headers: {
                        Authorization: secrets.API_KEY
                    }
                })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    getPhotos(data.photos);
                    console.log('Results Found:',
                        data.photos.length, 'on Page', i);
                });

            async function getPhotos(images) {
                images.map(image => {
                    var url = image.src.medium;

                    const dl = new DownloaderHelper(url, dir);
                    k = k + 1;

                    dl
                        .on('download', downloadInfo => console.log('Download Begins: ', {
                            name: downloadInfo.fileName,
                            size: formatBytes(downloadInfo.totalSize)
                        }))

                    dl.start();

                })
                console.log('Total Files Downloaded: ', k);
            }

            readline.close();
        } else {
            console.log('Kindly Enter atleast 1 to continue');
            readline.close();
        }
    });
});