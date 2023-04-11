// niz objekata koji predstavljaju oblast i ponudjene rijeci
const pitanja = [{
    oblast: "Pogodite grad u Crnoj Gori",
    ponudjeno: [
      "podgorica",
      "budva",
      "bar",
      "kolašin",
      "danilovgrad",
      "tivat",
      "kotor"
    ]
  },
  {
    oblast: "Pogodite programski jezik",
    ponudjeno: [
      "javascript",
      "php",
      "python",
      "cpp",
      "csharp",
      "kotlin"
    ]
  }
];



var randomPitanje = pitanja[Math.floor(Math.random() * pitanja.length)];
var randomOblast = randomPitanje.oblast;
var result = randomPitanje.ponudjeno[Math.floor(Math.random() * randomPitanje.ponudjeno.length)];

var shownResult = '';

result.split("").forEach(slovo => shownResult += "_")


document.querySelector("#naziv-oblasti>h2").innerHTML = randomOblast;

document.querySelector("#odgovor>h1").innerHTML = shownResult;

document.getElementById("result").innerHTML = result;

var gameOver = false;


let abeceda = ['a', 'b', 'c', 'č', 'ć', 'd', 'dž', 'đ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'o', 'p', 'r', 's', 'š', 't', 'u', 'v', 'z', 'ž', 'y'];

var mistakes = 0;

var buttonsHTML = ``;
var letterClicked = ``;
var imageHTML = ``;

document.getElementById("hangman-image").innerHTML = `<img src="img/${mistakes}.png" alt="">`


abeceda.forEach(letter => {
  buttonsHTML += `
            <button class='btn btn-primary me-1' data-letterclicked='${letter}' id='button-${letter}'>
                ${letter.toUpperCase()}
            </button>`
});

document.getElementById("letters").innerHTML = buttonsHTML;


var index;

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
          alert("YOU WON")
        }
      } else {
        mistakes += 1;
        document.getElementById("hangman-image").innerHTML = `<img src="img/${mistakes}.png" alt="">`
        if (mistakes == 6) {
          document.querySelector("body").classList.add("disabled-mouse")
          alert("GAME OVER");
        }
      }
    } else {
      
    }

  })
})



function replaceAll(replace) {
  let index = 0;
  let arrayResult = result.split("");
  let arrayShownResult = shownResult.split("")
  arrayShownResult.forEach(char => {
    if (arrayResult[index] == letterClicked) {
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