// functions for all the voice functionality for breakfast recipe


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
    document.getElementById("currVol").innerHTML = "Current Volume: " + rounded;
    
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
    document.getElementById("currVol").innerHTML = "Current Volume: " + rounded;
    
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
    document.getElementById("currRate").innerHTML = "Current Rate: " + rounded;
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
    document.getElementById("currRate").innerHTML = "Current Rate: " + rounded;
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
    document.getElementById("currPitch").innerHTML = "Current Pitch: " + rounded;
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
    document.getElementById("currPitch").innerHTML = "Current Pitch: " + rounded;
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

// hide/show the voice commands
function toggleCommands() {
    var x = document.getElementById("voiceCommands");
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

// ---------- SPECIFICALLY FOR BREAKFAST RECIPE -------------------------------

var recipe_steps = [
    "Place the tortilla on a flat surface. Use a knife to make a cut from the bottom edge of the tortilla to the center along the radius.",
    "Heat the butter in a pan and scramble two eggs the way you like them.",
    "Imagine the tortilla made up of four quarters. We are going to fill each of these quarters with a different filling.",
    "Place each of the four fillings, i.e., the 2 scrambled eggs, 3 tablespoons of shredded cheese, 2 tablespoons of salsa, and 1/2 mashed avocado, into their own quarter on the tortilla. Be careful not to overfill them!",
    "Starting with the bottom right quarter, fold the tortilla over the top right quarter, then over the top left quarter and finally, over the bottom left quarter to form a triangle shape.",
    "Transfer the tortilla to the same pan with a little extra butter for greasing.",
    "Cook it until golden brown and crispy, about 2-3 minutes. Flip and cook until the cheese is melty.",
    "Remove from heat and allow to rest for one minute and serve."
];


var recipe_ingredients = [
    "1 large burrito-sized tortilla",
    "1 tablespoon butter + more for greasing pan",
    "2 eggs + scrambled egg ingredients",
    "1/2 avocado mashed",
    "2 tablespoons chunky salsa",
    "3 tablespoons shredded mozzarella cheese"
];

var recipe_supplies = [
    "Pan",
    "Spatula",
    "Knife"
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



function getIngredients() {
    var str = "";
    var i;
    for (var i=0; i < recipe_ingredients.length; i++) {
        var supply = recipe_ingredients[i];
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
    } else if (str_request == "read ingredients" || str_request == "reed ingredients") {
        return getIngredients();
    }
    
    else if (str_request == "repeat") {
        return lastMsg;
    }


    // individual ingredients
    else if (str_request == "read tortilla" || str_request == "reed tortilla") {
        return "1 large burrito-sized tortilla";
    } else if (str_request == "read butter" || str_request == "reed butter") {
        return "1 tablespoon butter + more for greasing pan";
    } else if (str_request == "read eggs" || str_request == "reed eggs") {
        return "2 eggs + scrambled egg ingredients";
    } else if (str_request == "read avocado" || str_request == "reed avocado") {
        return "1/2 avocado mashed";
    } else if (str_request == "read salsa" || str_request == "reed salsa") {
        return "2 tablespoons chunky salsa";
    } else if (str_request == "read cheese" || str_request == "reed cheese") {
        return "3 tablespoons shredded mozzarella cheese";
    }

    
    else {
        return "Sorry, request not recognized."
    }
}


