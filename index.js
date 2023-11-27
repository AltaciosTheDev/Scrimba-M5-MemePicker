//step 1: import data from data.js file 
import {catsData} from "./data.js"

//step 2: dom control always use CONST VARIABLES. ml;jl;jol;
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById("meme-modal")
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

//Events 
emotionRadios.addEventListener("change", highlightCheckedOption) //event 1
getImageBtn.addEventListener("click", renderCat) //event 2  
memeModalCloseBtn.addEventListener("click", closeModalBtn) //event 3 

//function 7 -> CloseModalBtn -> change the property display of the meme modal to none so it dissapears
function closeModalBtn(){
    memeModal.style.display = "none" 
}

//funtion 6-> renderCat() -> render into the meme modal inner the single cat object
function renderCat(){
    const catObject = getSingleCatObject()
    memeModal.style.display = "flex" //gotta do this so the modal reappears every time it is click
    memeModalInner.innerHTML = `<img class="cat-img" src="images/${catObject.image}">`    
}

//function 5-> getSingleCatObject -> returns only 1 element from the matchingCatsarray 
function getSingleCatObject(){
    const matchingCatsArray = getMatchingCatsArray()
//if it is a single element array, just return the element in the first position[0]
    if(matchingCatsArray.length ===1){
        return catsArray[0]
    }
    else{
//get rid of the array, we just want the object in the random index
        const randomIndex = Math.floor(Math.random() * matchingCatsArray.length)
        return matchingCatsArray[randomIndex]
    }
}
// //function 4 ->getMatchingCatsArray -> uses the selected emotion and the isGif to filter the catsData and only return an array that matched the criteria 
// //depends on 2 values: selected emotion & isGIF 
 function getMatchingCatsArray(){
     const selectedEmotion = document.querySelector("input[type=radio]:checked").value
// //value sets or returns the value of the input 
// //we should be able to use getElementById i just don't know why it doesn't work.
     const isGif = gifsOnlyOption.checked     
// //sets or returns the boolean state of the checked property. True or False.
    const matchingCatsArray = catsData.filter(function(cat){
         if(isGif){
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif === true 

         }
        else{
             return cat.emotionTags.includes(selectedEmotion) 
         }
     })
    return matchingCatsArray
 }

//function 3 -> highlightCheckedOption -> selected(checked) radio needs to be highlighted in red and all other need to lose the highlighting 
function highlightCheckedOption(e){
    let radios = document.getElementsByClassName('radio')
    for(let radio of radios){
        radio.classList.remove("highlight")
    }
    document.querySelector("input[type=radio]:checked").parentElement.classList.add('highlight')
//this can be done in 2 ways:
//1)getElementbyId(e.target.id) -> will return ID of element that initiated the event
//2)querySelector("input[type=radio]:check") -> will return input type radio that is checked 
//parent element is needed b/c it doesn't have an id and we need to access it to add the class.
}

//Function 2 -> RenderEmotionRadios -> render into the emoiton-radios div, a div with label and input radio for every emotion 
function RenderEmotionRadios(cats){
    let emotions = getEmotionsArray(cats)
    let radioItems = ''
    for(let emotion of emotions){
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
            </div>
        `
//input value is absolutely necessary we wouldn't be able to fetch cat info without it when selected
    }
    emotionRadios.innerHTML = radioItems
}

//Function 1 -> getEmotionsArray : return from catsData an array of only emotions without repeated emotions
function getEmotionsArray(cats){
    let emotionsArray = []
    for(let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

RenderEmotionRadios(catsData)



