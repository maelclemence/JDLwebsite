
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function size() {
  var numbers = '0123456789';
  var taille = "px";
  for (var i = 0; i < 2; i++) {
    taille = numbers[Math.floor(Math.random() * 10)] + taille ;
  }
  console.log("taille:",taille) 
  return taille;
}

function creatBackgroundColor() {
  var numbers = '0123456789';
  var taille = "px";
  for (var i = 0; i < 2; i++) {
    taille = numbers[Math.floor(Math.random() * 10)] + taille ;
  }
  console.log("taille:",taille) 
  return taille;
}

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


// get window width and height
var winWidth = window.innerWidth*0.9;
var winHeight = window.innerHeight*0.9;

// get random numbers for each element
randomTop = getRandomNumber(0, winHeight);
randomLeft = getRandomNumber(0, winWidth);


// function that returns a random number between a min and max
function getRandomNumber(min, max) {
  
return Math.random() * (max - min) + min;

}
 

function setColorTitle() {
  document.getElementById('title').innerHTML=`<h1  
  class="text-center" style="color:${getRandomColor()};font-size: 100px " id="title" > WAKE UP! 
  </h1>`
}

var sentences = [];

function changeSentencesOpacity()
{ sentences.forEach(function(sentence){
let result = sentence.substring(33, 36);
console.log(result)
mastercard=parseFloat(result);
let visacard= 0.9*(Math.round(mastercard*10)/10)
let backtostring= visacard.toString()
sentence.replace(sentence.substring(33.36),backtostring)
console.log(visacard)
sentencemodif=sentence.replace(result,backtostring)
console.log(sentencemodif)


})


}


function showRandomActivity(activity) {
const sentence = ` <p style="color:${getRandomColor()};opacity:1.0;font-size:${size()};top:${getRandomNumber(0, winHeight)}px;left:${getRandomNumber(0, winHeight)}px">${activity}</p>`;
  // iterate on list and diminish opacity of each sentence
  changeSentencesOpacity()
  sentences.push(sentence);
  document.getElementById('activity').innerHTML = sentences.join();
 
}
