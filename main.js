const search = document.querySelector('.search')
const input = document.querySelector('input[type="text"]')
const btnDelete = document.querySelector('.btn.delete')
const btnFind = document.querySelector('.btn.find')
const btnRandom = document.querySelector('.btn.random')
const phraseDOM = document.querySelectorAll('.phrase')
const phrases = document.querySelector('.phrases')

search.addEventListener('click', activateInput)
btnDelete.addEventListener('click', deleteText)
btnDelete.addEventListener('click', removeElements)
btnFind.addEventListener('click', findInGoogle)
input.addEventListener('keyup', findByEnter)

function findByEnter(e){
    if(e.keyCode == 13){
        btnFind.click();
    }
}

function activateInput(){
            search.classList.add("active")
            btnDelete.classList.add("active")
            btnFind.classList.add("active")
            btnRandom.classList.add("active")
            input.classList.add("active")
            input.focus()
    }

function deleteText(e){
        e.stopPropagation()
      if(input.value === "") {
            search.classList.remove("active")
            btnDelete.classList.remove("active")
            btnFind.classList.remove("active")
            btnRandom.classList.remove("active")
            input.classList.remove("active")
      }
      else{
            input.value = "";
            input.focus()
      }     
}

function findInGoogle() {
    if(input.value === ""){
        alert("Przecież nic nie wpisałeś!")
    }
    else{
        const textToUrl = input.value
        window.open(`https://google.com//search?q=${textToUrl}`, '_blank').focus();
    }
}


let phrasesArr = [];

function fetchPhrases(){
    fetch('assets/phrases.json')
.then(Response => Response.json())
.then((data) => {
    
    phrasesArr = data.phrase.map((x) => x);
    const sortedArr = phrasesArr.sort();

        input.addEventListener('keyup', (e) => {
            
            removeElements()
            for (let i of sortedArr){
                if(i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != ""){
                    const newElement = document.createElement("div");
                    newElement.classList.add("phrase");
                    newElement.innerHTML = i;
                    phrases.appendChild(newElement);
                    
                    newElement.addEventListener('click', (event) => {
                        const currentText = event.currentTarget.innerHTML;
                        input.value = currentText;

                    })
                    newElement.addEventListener('click', removeElements)

                }
            }
        })
        btnRandom.addEventListener('click', fillByRandom)

})
}

fetchPhrases();

function removeElements(){
    const items = document.querySelectorAll('.phrase')
    items.forEach((item) => {
        item.remove();
    })
    }

function fillByRandom(){
    let randomNumber = Math.floor(Math.random() * phrasesArr.length)
    console.log(phrasesArr[randomNumber])
    input.value = phrasesArr[randomNumber];


}

