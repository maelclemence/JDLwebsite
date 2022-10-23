window.fbAsyncInit = function() {
    FB.init({
        appId      : '1529858990784266',
        cookie     : true,
        xfbml      : true,
        version    : 'v15.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('Logged in and authenticated');
        setElements(true);
        testAPI();
    } else {
        console.log('Not authenticated');
        setElements(false);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function testAPI(){
    FB.api('/me?fields=name,first_name,last_name,email,birthday,location', function(response) {
        if (response && !response.error) {
            //console.log(response);
            buildProfile(response);
        }
    });
}

function buildProfile(user){
    let profile = `
        <h3>${user.name}</h3>
        <ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li> 
            <li class="list-group-item">Email: ${user.email}</li>    
            <li class="list-group-item">Birthday : ${user.birthday}</li>    
            <li class="list-group-item">Location: ${user.location.name}</li>       
        </ul>
    `;
    document.getElementById('profile').innerHTML = profile;
}

function setElements(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('logout').style.display = "block";
        document.getElementById('profile').style.display = "block";
        document.getElementById('fb-login-button').style.display = "none";
        document.getElementById('heading').style.display = "none";
    } else {
        document.getElementById('logout').style.display = "none";
        document.getElementById('fb-login-button').style.display = "block";
        document.getElementById('profile').style.display = "none";
        document.getElementById('heading').style.display = "block";
    }
}

function showRandomActivity(activity) {
    document.getElementById('activity').innerHTML = activity;
}

function showRandomAnibis(anibis) {
    console.log(anibis)
    let annonce = `
        <ul class="list-group">
            <li class="list-group-item">Annonce Anibis</li> 
            <li class="list-group-item">Titre: ${anibis.title}</li> 
            <li class="list-group-item">Catégorie: ${anibis.category.name}</li> 
            <li class="list-group-item">Détails: ${anibis.detailsExtraLarge[0]}</li> 
            <li class="list-group-item">Prix: ${anibis.price}</li>    
        </ul>
    `
    document.getElementById('anibis').innerHTML = annonce;
}

function showRandomRicardo(ricardo) {
    console.log(ricardo)
    var arrayLength = ricardo.length;
    document.getElementById('ricardo').innerHTML = "<h3>Articles Ricardo</h3>";
    for (var i = 0; i < arrayLength; i++) {
        console.log(ricardo[i]);
        article = ricardo[i]
        let annonce = `
        <ul class="list-group">
            <li class="list-group-item">${article.title}</li> 
            <li class="list-group-item">Prix à l'achat instantané : ${article.buyNowPrice} Frs</li> 
            <li class="list-group-item">Date de fin : ${article.enDate}</li> 
            <li class="list-group-item">Prix : ${article.bidPrice}</li> 
            <li class="list-group-item">Enchères: ${article.bidsCount}</li> 
        </ul>
        `
        document.getElementById('ricardo').innerHTML += annonce;
    }
}

function showRandomDepop(depop) {
    console.log(depop)
    var arrayLength = depop.length;
    document.getElementById('depop').innerHTML = "<h3>Articles Facebook</h3>";
    for (var i = 0; i < arrayLength; i++) {
        console.log(depop[i]);
        article = depop[i]
        let annonce = `
        <ul class="list-group">
            <li class="list-group-item">${article.title}</li>
            <li class="list-group-item">Prix : ${article.price}</li>
            <li class="list-group-item">Date de fin : ${article.end_date}</li>
            <li class="list-group-item">Enchères: ${article.bids}</li>
        </ul>
        `
        document.getElementById('depop').innerHTML += annonce;
    }
}

function logout() {
    FB.logout(function(response) {
        setElements(false);
    });
}

async function fetchData() {

    const response = await fetch("https://attach-cors.herokuapp.com/https://www.boredapi.com/api/activity?type=recreational", {
            "headers": {
                "accept": "application/json, text/plain, */*",
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

async function fetchFromAnibis() {
    const response = await fetch("https://attach-cors.herokuapp.com/https://api.anibis.ch/v4/fr/search/listings?cun=toutes-les-rubriques&fcun=toutes-les-rubriques&fts=clavier&pr=1", {
                                "headers": {
                                    "accept": "application/json",
                                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                                    // "content-type": "application/json",
                                    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-ch-ua-platform": "\"Linux\"",
                                },
                                "referrer": "https://www.anibis.ch/fr/c/toutes-les-rubriques?fts=clavier",
                                "referrerPolicy": "unsafe-url",
                                "body": null,
                                "method": "GET",
                                "mode": "cors",
                                "credentials": "omit"
                            })
                            .then(response => response.json())
                            .then(data => showRandomAnibis(data.listings[0]))
                            .catch(err => console.log(err));;
}

async function fetchFromRicardo() {
    const response = await fetch("https://attach-cors.herokuapp.com/https://www.ricardo.ch/api/mfa/categories/38399/promo-offers", {
                                    "headers": {
                                        "accept": "application/json, text/plain, */*",
                                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                                        "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Linux\"",
                                    },
                                    "referrer": "https://www.ricardo.ch/fr/c/o/antiquites-et-arts-38399/",
                                    "referrerPolicy": "unsafe-url",
                                    "body": null,
                                    "method": "GET",
                                    "mode": "cors",
                                    "credentials": "omit"
                            })
                            .then(response => response.json())
                            .then(data => showRandomRicardo(data))
                            .catch(err => console.log(err));;
}

async function fetchFromDepop() {
    const response = await fetch("https://attach-cors.herokuapp.com/https://webapi.depop.com/api/v2/search/products/?categories=9&itemsPerPage=24&country=gb&currency=GBP&sort=relevance", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
          "depop-search-id": "25bae4e3-e05d-4a21-8c9b-8c543d1ef782",
          "depop-session-id": "845fc889-42db-4430-a720-96292fd9d55e",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Linux\"",
          "sec-fetch-dest": "empty",
        },
        "referrer": "https://www.depop.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      })
        .then(response => response.json())
        .then(data => showRandomDepop(data))
        .catch(err => console.log(err));
}