
//  Random word generator

api_url = 'https://random-word-api.vercel.app/api?words=1';

fetchRandomWord(api_url);

var shownResult = ``;

function fetchRandomWord(url) {
  fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      result = data[0];
      fetchHints(`https://wordsapiv1.p.mashape.com/words/${result}`)
      game(result);
    })
}

function fetchHints(url) {
  fetch(url)
  .then(response => {
    return response.json();
  }).then(data => {
    hints = JSON.stringify(data);
    console.log(hints);
  })
}

function game(result) {
  let abeceda = "qwertyuiopasdfghjklzxcvbnm";
  abeceda = abeceda.split("")

  var mistakes = 0;

  var buttonsHTML = ``;
  var letterClicked = ``;


  result.split("").forEach(() => shownResult += "_");


  document.querySelector("#odgovor>h1").innerHTML = shownResult;
  document.getElementById("hangman-image").innerHTML = `<img src="img/${mistakes}.png" alt="..." loading="lazy">`
  document.getElementById("picture").setAttribute("src", `img/${mistakes}.png`);
  //  Generating buttons
  abeceda.forEach(letter => {
    buttonsHTML += `
              <button class='btn btn-primary p-3 me-1 mb-1' data-letterclicked='${letter}' id='button-${letter}'>
                  ${letter.toUpperCase()}
              </button>`
  });
  document.getElementById("letters").innerHTML = buttonsHTML;




  //  BUTTONS
  document.querySelectorAll('button').forEach(letter => {
    letter.addEventListener("click", (element) => {
      letterClicked = element.target.dataset.letterclicked
      element.target.classList.add("disabled");


      if (mistakes < 6) {
        if (result.indexOf(letterClicked) != -1) {
          shownResult = replaceAll(letterClicked)
          document.querySelector("#odgovor>h1").innerHTML = shownResult;
          if (shownResult.toLowerCase() == result) {
            document.querySelector("body").classList.add("disabled-mouse")
            document.querySelector(".modal-body").innerHTML = `<h1>CONGRATULATIONS YOU WON! :)</h1>`
            document.getElementById("modal-button").click();
          }
        } else {
          console.log(letterClicked)
          mistakes += 1;
          document.getElementById("hangman-image").innerHTML = `<img src="img/${mistakes}.png" alt="">`
          if (mistakes == 6) {
            document.querySelector("body").classList.add("disabled-mouse")
            document.querySelector(".modal-body").innerHTML = `<h1>YOU LOST! :(</h1>`
            document.getElementById("modal-button").click();
            document.querySelector("#odgovor>h1").innerHTML = result.toUpperCase();
          }
        }
      } else {

      }

    })
  })

}


function replaceAll(replace) {
  let index = 0;
  let arrayResult = result.split("");
  let arrayShownResult = shownResult.split("")
  arrayShownResult.forEach(() => {
    if (arrayResult[index] == replace) {
      console.log("nadjeno slovo")
      arrayShownResult[index] = replace.toUpperCase();
    }
    index += 1;
  })
  return arrayShownResult.join("");

}


//        Shown result:
//        _ _ _ _ _


//        Result:
//        T I V A T


// loop tru result to find index of the clicked letter
// replace the letter at that index with the clicked letter in shown result