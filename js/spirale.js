function showRandomAnibis(anibis) {
    console.log("anibis : ", anibis)
    return [{
        "title": anibis.title,
        "price": anibis.price,
        "name": anibis.category.name,
        "image": "",
        "url": "https://www.anibis.ch/fr", 
        "platform": "anibis"
    }]
}

function showRandomRicardo(ricardo) {
    console.log("Ricardo ", ricardo)
    var result = [];
    var arrayLength = ricardo.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(ricardo[i]);
        article = ricardo[i];
        result.push({
            "title": article.title,
            "price": article.buyNowPrice,
            "name": article.title,
            "image": "",
            "url": "https://www.ricardo.ch/fr/c/o/antiquites-et-arts-38399/",
            "platform": "ricardo"
        })
    }
    return result;
}

function showRandomDepop(depop) {
    console.log("Depop : ", depop)
    result = [];
    var arrayLength = depop.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(depop[i]);
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

async function fetchData() {
    const anibis = await fetchFromAnibis();
    const ricardo = await fetchFromRicardo();
    const depop = await fetchFromDepop();
    result = anibis.concat(ricardo).concat(depop);
    for (var i = 0; i < result.length; i++) {
        addArticle(result[i]);
    }
}

function addArticle(article) {
    console.log("addArticle : ", article)
    html = `
        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

            <div class="card-body">
              <p class="card-text">${article.name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
    `;
    document.getElementById("all_articles").innerHTML += html;
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
        .then(data => showRandomDepop(data.products))
        .catch(err => console.log(err));
}
