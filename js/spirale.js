function sanitizeAnibisItems(anibis) {
    console.log("anibis : ", anibis)
    var result = [];
    var arrayLength = anibis.length;
    for (var i = 0; i < arrayLength; i++) {
        article = anibis[i];
        var image = "../../img/goose.png";
        try {
            const baseUrl = article.imageData.baseUrl;
            const size   =  "/?380x285/0/60/";
            const first_image   = article.imageData.images[0].substring(9);
            image = baseUrl + size + first_image;
        } catch (error) {
            console.log("error : ", error)
        }
        result.push({
            "title": article.title,
            "price": article.price,
            "name": article.category.name,
            "image": image,
            "url": `https://www.anibis.ch${article.url}`, 
            "platform": "anibis"
        })
    }
    return result;
}

function sanitizeRicardoItems(ricardo) {
    var result = [];
    var arrayLength = ricardo.length;
    for (var i = 0; i < arrayLength; i++) {
        article = ricardo[i];
        result.push({
            "title": article.title,
            "price": article.buyNowPrice,
            "name": article.title,
            "image": "../../img/goose.png",
            "url": "https://www.ricardo.ch/fr/c/o/antiquites-et-arts-38399/",
            "platform": "ricardo"
        })
    }
    return result;
}

function sanitizeDepopItems(depop) {
    result = [];
    for (var i = 0; i < depop.length; i++) {
        article = depop[i]
        result.push({
            "title": article.slug,
            "price": article.price,
            "name": article.title,
            "image": article.preview["150"],
            "url": "https://www.depop.com/",
            "platform": "depop"
        })
    }
    return result;
}

function addArticles(articles) {
    console.log('Adding articles...');
    for (var i = 0; i < articles.length; i++) {
        const article = articles[i];
        html = `
            <div class="col">
              <div class="card shadow-sm">
                <img src=${article.image} alt="Image de l'article">
                <div class="card-body">
                  <p class="card-text">${article.title}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a class="btn btn-primary my-2" href="${article.url}" target="_blank">View</a>
                      <a class="btn btn-secondary my-2" href="https://jeudeloie.ch" target="_blank">JDL</a>
                    </div>
                    <small class="text-muted">${article.platform}</small>
                  </div>
                </div>
              </div>
            </div>
        `;
        document.getElementById("all_articles").innerHTML += html;
    }
}

async function fetchData() {
    console.log('Fetching data...');
    Promise.call(fetchFromAnibis("Shampoo")).then(function(results) {
            addArticles(results);
    });
    Promise.call(fetchFromRicardo()).then(function(results) {
            addArticles(results);
    });
    Promise.call(fetchFromDepop()).then(function(results) {
            addArticles(results);
    });
}

async function fetchFromAnibis(recherche) {
    return fetch(`https://attach-cors.herokuapp.com/https://api.anibis.ch/v4/fr/search/autosuggestions?cid=1&fcid=1&fts=shampoo&pr=1`, {
                                "headers": {
                                    "accept": "application/json",
                                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                                    // "content-type": "application/json",
                                    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-ch-ua-platform": "\"Linux\"",
                                },
                                "referrer": `https://www.anibis.ch/fr/c/toutes-les-rubriques?fts=shampoo`,
                                "referrerPolicy": "unsafe-url",
                                "body": null,
                                "method": "GET",
                                "mode": "cors",
                                "credentials": "omit"
                            })
                            .then(response => response.json())
                            .then(data => sanitizeAnibisItems(data.listings))
}

async function fetchFromRicardo() {
    return fetch("https://attach-cors.herokuapp.com/https://www.ricardo.ch/api/mfa/categories/38399/promo-offers", {
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
                            .then(data => sanitizeRicardoItems(data))
}

async function fetchFromDepop() {
    return fetch("https://attach-cors.herokuapp.com/https://webapi.depop.com/api/v2/search/products/?categories=9&itemsPerPage=24&country=gb&currency=GBP&sort=relevance", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Linux\"",
        },
        "referrer": "https://www.depop.com/",
        "referrerPolicy": "unsafe-url",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      })
        .then(response => response.json())
        .then(data => sanitizeDepopItems(data.products))
}
