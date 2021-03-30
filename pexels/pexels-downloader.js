const container = document.querySelector(".img-container");
const cardTag = document.querySelector(".card");
const doewnloadBtn = document.getElementById("doewnloadBtn");
const progressBar = document.getElementById("progress-bar");

doewnloadBtn.onclick = function() {
    const search = document.getElementById("search").value;
    const numbers = document.getElementById("numbers").value;
    const size = document.getElementById("size").value;
    const page = document.getElementById("page").value;
    $(".card").empty();
    if (search && numbers && size && page !== '') {

        fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=${numbers}&page${page}`, {
                headers: {
                    Authorization: "563492ad6f91700001000001a7e393a9aac942e4a5a869179e30278d"
                }
            })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                // console.log(data.photos)
                getPhotos(search, data.photos, size);

            })
    } else {
        alert('Kindly Fill All Fields!');
    }
};


function getPhotos(search, images, sizes) {
    images.map(image => {
        var img;

        if (sizes == 'large') {
            img = image.src.large;
        } else if (sizes == 'large2x') {
            img = image.src.large2x;
        } else if (sizes == 'medium') {
            img = image.src.medium;
        } else if (sizes == 'original') {
            img = image.src.original;
        } else if (sizes == 'small') {
            img = image.src.small;
        }
        // ! function() {
        //     new jsFileDownloader({
        //             url: img,
        //             process: process
        //         })
        //         .then(function() {
        //             var imgSrc = document.createElement('img');
        //             cardTag.id = 'card';

        //             imgSrc.src = img;
        //             imgSrc.title = 'By: ' + image.photographer;
        //             cardTag.appendChild(imgSrc);
        //             container.appendChild(cardTag);
        //             progressBar.style.width = '0%';
        //         })
        //         .catch(function(error) {
        //             console.error(error);
        //         });


        function process(event) {
            if (!event.lengthComputable) return; // guard
            var downloadingPercentage = Math.floor(event.loaded / event.total * 100) + '%';
            progressBar.style.width = downloadingPercentage;
            progressBar.title = downloadingPercentage;
        };
        // }();
    })
}

function getVideos(videos, sizes) {
    videos.map(video => {
        var vid;

        if (sizes == 'large') {
            vid = video.src.large;
        } else if (sizes == 'large2x') {
            vid = video.src.large2x;
        } else if (sizes == 'medium') {
            vid = video.src.medium;
        } else if (sizes == 'original') {
            vid = video.src.original;
        } else if (sizes == 'small') {
            vid = video.src.small;
        }

        ! function() {
            new jsFileDownloader({
                    url: img,
                    process: process
                })
                .then(function() {
                    var imgSrc = document.createElement('img');
                    cardTag.id = 'card';

                    imgSrc.src = img;
                    imgSrc.title = 'By: ' + image.photographer;
                    cardTag.appendChild(imgSrc);
                    container.appendChild(cardTag);
                    progressBar.style.width = '0%';
                })
                .catch(function(error) {
                    console.error(error);
                });


            function process(event) {
                if (!event.lengthComputable) return; // guard
                var downloadingPercentage = Math.floor(event.loaded / event.total * 100) + '%';
                progressBar.style.width = downloadingPercentage;
                progressBar.title = downloadingPercentage;
            };
        }();
    })
}