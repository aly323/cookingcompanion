// functions for all the voice functionality for pasta recipe


// SOURCE:
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel
// https://www.hongkiat.com/blog/text-to-speech/


// create global variable that will be the spoken message
var synth = window.speechSynthesis;
var msg = new SpeechSynthesisUtterance();
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
var voices = [];


function populateVoiceList() {
    voices = synth.getVoices();
    var voiceSelect = document.querySelector('.select');
  
    for (i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
      if (voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


// A float that represents the volume value, between 0 (lowest) and 1 (highest)
// default value 1
function decreaseVolume() {
    
    var increment = 0.1;
    var currVol = msg.volume;
    var newVol = currVol - increment;

    // volume can't go below 0
    if (newVol < 0) {
        msg.volume = 0;
    } else {
        msg.volume = newVol;
    }
    var rounded = Math.round(msg.volume * 100) / 100;
    document.getElementById("currVol").innerHTML = "current volume [between 0 (lowest) and 1 (highest)]: " + rounded;
    
}

function increaseVolume() {
    
    var increment = 0.1;
    var currVol = msg.volume;
    var newVol = currVol + increment;

    // volume can't go above 1
    if (newVol > 1) {
        msg.volume = 1;
    } else {
        msg.volume = newVol;
    }
    var rounded = Math.round(msg.volume * 100) / 100;
    document.getElementById("currVol").innerHTML = "current volume [between 0 (lowest) and 1 (highest)]: " + rounded;
    
}

// speed of speech
// A float representing the rate value. It can range between 0.1 (lowest) and 10 (highest). 
// default value of 1
function increaseRate() {
    
    var increment = 0.1;
    var currRate = msg.rate;
    var newRate = currRate + increment;

    // rate can't go above 10
    if (newRate > 10) {
        msg.rate = 10;
    } else {
        msg.rate = newRate;
    }
    var rounded = Math.round(msg.rate * 100) / 100;
    document.getElementById("currRate").innerHTML = "current rate [0.1 (lowest) and 10 (highest)]: " + rounded;
}


function decreaseRate() {
    
    var increment = 0.1;
    var currRate = msg.rate;
    var newRate = currRate - increment;

    // rate can't go below 0.1
    if (newRate < 0.1) {
        msg.rate = 0.1;
    } else {
        msg.rate = newRate;
    }
    var rounded = Math.round(msg.rate * 100) / 100;
    document.getElementById("currRate").innerHTML = "current rate [0.1 (lowest) and 10 (highest)]: " + rounded;
}



// A float representing the pitch value. It can range between 0 (lowest) and 2 (highest)
// default value of 1
function decreasePitch() {
    
    var increment = 0.1;
    var currPitch = msg.pitch;
    var newPitch = currPitch - increment;

    // pitch can't go below 0
    if (newPitch < 0) {
        msg.pitch = 0;
    } else {
        msg.pitch = newPitch;
    }
    var rounded = Math.round(msg.pitch * 100) / 100;
    document.getElementById("currPitch").innerHTML = "current pitch [0 (lowest) and 2 (highest)]: " + rounded;
}

function increasePitch() {
    
    var increment = 0.1;
    var currPitch = msg.pitch;
    var newPitch = currPitch + increment;

    // pitch can't go above 2
    if (newPitch > 2) {
        msg.pitch = 2;
    } else {
        msg.pitch = newPitch;
    }
    var rounded = Math.round(msg.pitch * 100) / 100;
    document.getElementById("currPitch").innerHTML = "current pitch [0 (lowest) and 2 (highest)]: " + rounded;
}

// test what the voice sounds like
function playVoice() {
    var voiceSelect = document.querySelector('.select');
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length ; i++) {
        if (voices[i].name === selectedOption) {
            msg.voice = voices[i];
        }
    }


    msg.text = "Hello, I am your cooking companion."
    synth.speak(msg);
}

// can stop the voice mid sentence
function stopVoice() {
    if (synth.speaking) {
        synth.cancel()
    }
    
}

// hide/show the settings to change the voice
function toggleSettings() {
    var x = document.getElementById("changeSettings");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


// Speech to text
// https://www.studytonight.com/post/javascript-speech-recognition-example-speech-to-text

function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
        // new speech recognition object
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
    
        // This runs when the speech recognition service starts
        recognition.onstart = function() {
            action.innerHTML = "<small>listening, please speak...</small>";
        };
        
        recognition.onspeechend = function() {
            action.innerHTML = "<small>stopped listening, hope you are done...</small>";
            recognition.stop();
        }
      
        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;
            transcript = transcript.toLowerCase();
            confidence = confidence * 100;
            var confidence_rounded = Math.round(confidence * 100) / 100;
            output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence_rounded+"%";
            output.classList.remove("hide");

            tts(transcript)
        };
      
         // start recognition
         recognition.start();
}

var currStep = 0;
var currSupply = 0;
var currIngredient = 0;
var lastMsg = "Nothing to repeat yet";



// https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h
// convert the given text to speech
function tts(str_request) {
    
    // Speech Synthesis supported
    if ('speechSynthesis' in window) {
        // convert to all lower case
        str_request = str_request.toLowerCase();
        
        
        msg.text = getMessage(str_request);
        lastMsg = msg.text;
        synth.speak(msg);
    } else {
        // Speech Synthesis Not Supported 
        alert("Sorry, your browser doesn't support text to speech!");
    }

    
}

// ---------- SPECIFICALLY FOR PASTA RECIPE -------------------------------

var recipe_steps = [
    "Preheat oven to 400.", 
    "Add 1/2 cup olive oil to a baking dish and toss with whole cherry tomatoes. Salt and pepper until everything is coated.", 
    "Place the whole block of feta in the middle of the pan and top with a splash more of olive oil plus a few cranks of fresh pepper.", 
    "Bake for 30 minutes.", 
    "Meanwhile, prepare bowtie pasta according to directions then strain.", 
    "After the 30 minutes has passed, crank the heat up to 450 and bake for another 5-10 minutes or until the feta and tomatoes have browned.", 
    "Remove the baking dish from the oven and add garlic and red pepper flakes to taste.", 
    "Stir so the residual heat cooks the garlic and releases the flavors from the red pepper flakes.", 
    "Toss in the pasta and stir one more time.", 
    "Finish with fresh basil, another splash of olive oil and season with salt and pepper.", 
    "If the dish is perfectly creamy, then it’s ready to serve! If it’s a little dry, add 1/4 cup pasta water and stir it up."
];

var recipe_ingredients_pasta = [
    "1 lb bowtie pasta"
];

var recipe_ingredients_sauce = [
    "1/2 cup olive oil + more for finishing", 
    "2 10oz boxes of cherry tomatoes (around 20-25 oz). TRICK: have tomatoes a little wilted and old", 
    "1 (8 oz) block feta"
];

var recipe_ingredients_garnishing = [
    "2 cloves of fresh garlic finely chopped",
    "1 handful fresh basil leaves",
    "A few pinches of red pepper flakes",
    "Kosher salt",
    "Fresh pepper"
];

var recipe_ingredients = [
    "1 lb bowtie pasta",
    "1/2 cup olive oil + more for finishing", 
    "2 10oz boxes of cherry tomatoes (around 20-25 oz). TRICK: have tomatoes a little wilted and old", 
    "1 (8 oz) block feta",
    "2 cloves of fresh garlic finely chopped",
    "1 handful fresh basil leaves",
    "A few pinches of red pepper flakes",
    "Kosher salt",
    "Fresh pepper"
];

var recipe_supplies = [
    "Baking dish, Small enough so that the tomatoes are crowded together and touching but deep enough to be able to hold the pasta at the end",
    "Strainer", 
    "Large pot", 
    "Cutting board"
];



function getNextStep() {
    var nextStep = currStep + 1;
    var str = "";
    if (nextStep > recipe_steps.length) {
        str = "Sorry, there are no more next steps";
    } else {
        str = recipe_steps[nextStep - 1];
        currStep++;
    }

    return str;
}

function getPreviousStep() {
    var previousStep = currStep - 1;
    var str = "";

    if (previousStep < 1) {
        str = "Sorry, there are no more previous steps";
    } else {
        str = recipe_steps[previousStep - 1];
        currStep--;
    }

    return str;
}

function getNextSupply() {
    var nextSupply = currSupply + 1;
    var str = "";
    if (nextSupply > recipe_supplies.length) {
        str = "Sorry, there are no more next supplies";
    } else {
        str = recipe_supplies[nextSupply - 1];
        currSupply++;
    }

    return str;
}

function getPreviousSupply() {
    var previousSupply = currSupply - 1;
    var str = "";

    if (previousSupply < 1) {
        str = "Sorry, there are no more previous supplies";
    } else {
        str = recipe_supplies[previousSupply - 1];
        currSupply--;
    }

    return str;
}


function getNextIngredient() {
    var nextIngredient = currIngredient + 1;
    var str = "";
    if (nextIngredient > recipe_ingredients.length) {
        str = "Sorry, there are no more next ingredients";
    } else {
        str = recipe_ingredients[nextIngredient - 1];
        currIngredient++;
    }

    return str;
}

function getPreviousIngredient() {
    var previousIngredient = currIngredient - 1;
    var str = "";

    if (previousIngredient < 1) {
        str = "Sorry, there are no more previous ingredients";
    } else {
        str = recipe_ingredients[previousIngredient - 1];
        currIngredient--;
    }

    return str;
}

function getSupplies() {
    var str = "";
    var i;
    for (var i=0; i < recipe_supplies.length; i++) {
        var supply = recipe_supplies[i];
        str += supply + ". ";
    }

    return str;
}

function getPastaIngredients() {
    var str = "";
    var i;
    for (var i=0; i < recipe_ingredients_pasta.length; i++) {
        var supply = recipe_ingredients_pasta[i];
        str += supply + ". ";
    }

    return str;
}

function getSauceIngredients() {
    var str = "";
    var i;
    for (var i=0; i < recipe_ingredients_sauce.length; i++) {
        var supply = recipe_ingredients_sauce[i];
        str += supply + ". ";
    }

    return str;
}

function getGarnishingIngredients() {
    var str = "";
    var i;
    for (var i=0; i < recipe_ingredients_garnishing.length; i++) {
        var supply = recipe_ingredients_garnishing[i];
        str += supply + ". ";
    }

    return str;
}




// get the message needed based on what user requested
function getMessage(str_request) {

    // individual steps
    if (str_request == "step one" || str_request == "step 1") {
        return recipe_steps[0];
    } else if (str_request == "step two" || str_request == "step 2" || str_request == "step to" || str_request == "step too") {
        return recipe_steps[1];
    } else if (str_request == "step three" || str_request == "step 3") {
        return recipe_steps[2];
    } else if (str_request == "step four" || str_request == "step 4" || str_request == "step for") {
        return recipe_steps[3];
    } else if (str_request == "step five" || str_request == "step 5") {
        return recipe_steps[4];
    } else if (str_request == "step six" || str_request == "step 6") {
        return recipe_steps[5];
    } else if (str_request == "step seven" || str_request == "step 7") {
        return recipe_steps[6];
    } else if (str_request == "step eight" || str_request == "step 8") {
        return recipe_steps[7];
    } else if (str_request == "step nine" || str_request == "step 9") {
        return recipe_steps[8];
    } else if (str_request == "step ten" || str_request == "step 10") {
        return recipe_steps[9];
    } else if (str_request == "step eleven" || str_request == "step 11") {
        return recipe_steps[10];
    }
    
    

    // previous/next step
    else if (str_request == "previous step") {
        return getPreviousStep();
    } else if (str_request == "next step") {
        return getNextStep();
    } 

    // previous/next supplies
    else if (str_request == "previous supply") {
        return getPreviousSupply();
    } else if (str_request == "next supply") {
        return getNextSupply();
    } 

    // previous/next ingredients
    else if (str_request == "previous ingredient") {
        return getPreviousIngredient();
    } else if (str_request == "next ingredient") {
        return getNextIngredient();
    } 

    // read all
    else if (str_request == "read supplies" || str_request == "reed supplies") {
        return getSupplies();
    } else if (str_request == "read pasta ingredients" || str_request == "reed pasta ingredients") {
        return getPastaIngredients();
    } else if (str_request == "read sauce ingredients" || str_request == "reed sauce ingredients") {
        return getSauceIngredients();
    } else if (str_request == "read garnishing ingredients" || str_request == "reed garnishing ingredients") {
        return getGarnishingIngredients();
    }
    
    else if (str_request == "repeat") {
        return lastMsg;
    }

    // individual ingredients
    else if (str_request == "read pasta" || str_request == "reed pasta") {
        return "1 lb bowtie pasta";
    } else if (str_request == "read olive oil" || str_request == "reed olive oil") {
        return "1/2 cup olive oil + more for finishing";
    } else if (str_request == "read tomatoes" || str_request == "reed tomatoes") {
        return "2 10oz boxes of cherry tomatoes (around 20-25 oz). TRICK: have tomatoes a little wilted and old";
    } else if (str_request == "read feta" || str_request == "reed feta") {
        return "1 (8 oz) block feta";
    } else if (str_request == "read garlic" || str_request == "reed garlic") {
        return "2 cloves of fresh garlic finely chopped";
    } else if (str_request == "read basil" || str_request == "reed basil") {
        return "1 handful fresh basil leaves";
    } else if (str_request == "read red pepper" || str_request == "reed red pepper") {
        return "A few pinches of red pepper flakes";
    } else if (str_request == "read salt" || str_request == "reed salt") {
        return "Kosher salt";
    } else if (str_request == "read pepper" || str_request == "reed pepper") {
        return "Fresh pepper";
    }
    
    
    else {
        return "Sorry, request not recognized."
    }
}


