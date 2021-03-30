const fetch = require("node-fetch");
const secrets = require('./secrets');
const helper = require('./helper/helper');

var i = 0;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

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
                    helper.getPhotos(data.photos);
                    console.log('Results Found:',
                        data.photos.length, 'on Page', i);
                });

            readline.close();
        } else {
            console.log('Kindly Enter atleast 1 to continue');
            readline.close();
        }
    });
});