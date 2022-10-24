
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
}

async function fetchData() {

    const response = await fetch("https://attach-cors.herokuapp.com/https://www.boredapi.com/api/activity?type=recreational", {
            "headers": {
                "accept": "application/json, t§ext/plain, */*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                // "if-none-match": "W/\"78-tZHpEjYTiXlvBBUX8OzulbytI3Q\"",
                "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                // "sec-fetch-dest": "empty",
                // "sec-fetch-mode": "cors",
                // "sec-fetch-site": "same-origin",
                // "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://www.boredapi.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
            })
            .then(response => response.json())
            .then(data => showRandomActivity(data.activity))
            .catch(err => console.log(err));
}




function showRandomActivity(activity) {
    document.getElementById('activity').innerText +=`\n ${activity}`;

    
}


function setElements(activity) { 
        document.getElementById('activity').style.display = "color";
    }    

function showRandomActivity(activity) {
    document.getElementById('activity').innerHTML +=` \n <p style="color:${getRandomColor()}"> ${activity}</p>`;
}
