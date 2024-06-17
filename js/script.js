$(document).ready(function() {
    // https://api.spacexdata.com/v5/launches/next
    $.getJSON("https://api.spacexdata.com/v5/launches/5eb87cd9ffd86e000604b32a", function(data) {
        console.log(data.links);
        $("#nextLaunchImage").attr("src", data.links.patch.small);
        setInterval(function() { $("#nextLaunchTitle").html(`Next launch • ${getTimeLeft(data.date_unix)}`) }, 1000)
        setInterval(function() { $("title").html(`SXLV • ${getTimeLeft(data.date_unix)}`) }, 1000)

        $("#nextLaunchName").html(data.name);
        $("#nextLaunchDate").html(convertDateFormat(data.date_utc));
        getLocality(data.launchpad)
            .then(locality => $("#nextLaunchLocality").html(locality))
            .catch(error => console.log(error));
        $("#nextLaunchWebcast").attr("href", `https://www.youtube.com/watch?v=${data.links.youtube_id}`);
        getPayloads(data.payloads)
            .then(payloads => $("#nextLaunchPayloads").html(payloads))
            .catch(error => console.log(error));
    })

    $.ajax({
        url: 'https://api.spacexdata.com/v5/launches/query',
        type: 'POST',
        data: JSON.stringify({
            options: {
                "sort": {
                    "date_utc": "asc" //"desc"
                },
                "limit": 10
            }
        }),
        contentType: 'application/json',
        success: function(data) {
            updateTable(data.docs);
        },
        error: function(error) {
            console.log('Error: ', error);
        }
    });
})

$("#filterButtonAll").click(function() {
    $.ajax({
        url: 'https://api.spacexdata.com/v5/launches/query',
        type: 'POST',
        data: JSON.stringify({
            options: {
                "sort": {
                    "date_utc": "asc" //"desc"
                },
                "limit": 10
            }
        }),
        contentType: 'application/json',
        success: function(data) {
            $("#filterTextAll").removeClass("hidden");
            $("#filterTextSuccess").addClass("hidden");
            $("#filterTextFailed").addClass("hidden");
            updateTable(data.docs);
        },
        error: function(error) {
            console.log('Error: ', error);
        }
    });
})

$("#filterButtonSuccess").click(function() {
    $.ajax({
        url: 'https://api.spacexdata.com/v5/launches/query',
        type: 'POST',
        data: JSON.stringify({
            query: {
                success: true
            },
            options: {
                "sort": {
                    "date_utc": "asc" //"desc"
                },
                "limit": 10
            }
        }),
        contentType: 'application/json',
        success: function(data) {
            $("#filterTextAll").addClass("hidden");
            $("#filterTextSuccess").removeClass("hidden");
            $("#filterTextFailed").addClass("hidden");
            updateTable(data.docs);
        },
        error: function(error) {
            console.log('Error: ', error);
        }
    });
})

$("#filterButtonFailed").click(function() {
    $.ajax({
        url: 'https://api.spacexdata.com/v5/launches/query',
        type: 'POST',
        data: JSON.stringify({
            query: {
                success: false
            },
            options: {
                "sort": {
                    "date_utc": "asc"
                },
                "limit": 10
            }
        }),
        contentType: 'application/json',
        success: function(data) {
            $("#filterTextAll").addClass("hidden");
            $("#filterTextSuccess").addClass("hidden");
            $("#filterTextFailed").removeClass("hidden");
            updateTable(data.docs);
        },
        error: function(error) {
            console.log('Error: ', error);
        }
    });
})

function getTimeLeft(targetUnixTime) {
    let lastingTime = new Date(targetUnixTime * 1000) - new Date();
    let days = Math.floor(lastingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((lastingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((lastingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((lastingTime % (1000 * 60)) / 1000);

    return days + " days " + hours + ":" + minutes + ":" + seconds;
}

function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function getLocality(launchpadId) {
    return new Promise((resolve, reject) => {
        $.getJSON(`https://api.spacexdata.com/v4/launchpads/${launchpadId}`, function(data) {
            resolve(`${data.locality}, ${data.region}`);
        })
            .fail(function(jqxhr, textStatus, error) {
                reject(error);
            });
    });
}

function getPayloads(payloadIds) {
    // Create an array to hold all the promises
    let promises = [];

    // For each payloadId, create a new promise and add it to the array
    payloadIds.forEach(payloadId => {
        let promise = new Promise((resolve, reject) => {
            $.getJSON(`https://api.spacexdata.com/v4/payloads/${payloadId}`, function(data) {
                resolve(`${data.name} (${data.customers.join(', ')})`);
            })
                .fail(function(jqxhr, textStatus, error) {
                    reject(error);
                });
        });

        promises.push(promise);
    });

    // Return a new promise that resolves when all the promises in the array have resolved
    return Promise.all(promises).then(payloads => payloads.join(', '));
}

function updateTable(data) {
    $("#launchesTable tbody").empty();
    data.forEach(launch => {
        let row = $("<tr class=''></tr>");

        row.append($("<td></td>").html(`<img src="${launch.links.patch.small}" alt="Launch patch">`));
        row.append($("<td></td>").text(launch.name));
        row.append($("<td></td>").text(convertDateFormat(launch.date_utc)));
        row.append($("<td></td>").text(launch.details));
        row.append($("<td></td>").html(`<a href="${launch.links.article}" target="_blank"><i class="fi fi-bs-arrow-up-right-from-square"></i></a>`));
        row.append($("<td></td>").html(`<a href="${launch.links.webcast}" class="youtube-link"><i class="fi fi-brands-youtube"></i></a>`));
        getLocality(launch.launchpad)
            .then(locality => row.append($("<td></td>").text(locality)))
            .catch(error => console.log(error));
        getPayloads(launch.payloads)
            .then(payloads => row.append($("<td></td>").text(payloads)))
            .catch(error => console.log(error));

        $("#launchesTable tbody").append(row);

        $('.youtube-link').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    });
}