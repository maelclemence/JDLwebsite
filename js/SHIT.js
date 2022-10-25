function ShowRandomStyle () {
    var divtext = document.getElementById ("titre");
    divtext.style.color = ` "color:${getRandomColor()}" ` ;
        }

function ShowRandomStyle () {
   document.getElementById('titre').innerHTML =` \n <p style="color:${getRandomColor()}"> Wake up </p>`à


    
     }

     function LeTitreEnCouleur() {
        document.getElementById('coloriser').innerText.style.color = getRandomColor();
      }
    

      function setColorTitle() {
        document.getElementById('title').style.color=getRandomColor();
      }
    