async function fetchData() {
    setColorTitle();
    const response = await fetch("https://attach-cors.herokuapp.com/https://www.boredapi.com/api/activity?type=recreational", {
            "headers": {
                "accept": "application/json, t§ext/plain, */*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",

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


