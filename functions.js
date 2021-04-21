// SOURCE:
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel
// https://www.hongkiat.com/blog/text-to-speech/


// create global variable that will be the spoken message
var synth = window.speechSynthesis;
var msg = new SpeechSynthesisUtterance();

function changeVoice() {
    

    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices#html

    var voices = synth.getVoices();


    
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
    
    document.getElementById("currVol").innerHTML = "current volume [between 0 (lowest) and 1 (highest)]: " + msg.volume;
    
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
    
    document.getElementById("currVol").innerHTML = "current volume [between 0 (lowest) and 1 (highest)]: " + msg.volume;
    
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
    
    document.getElementById("currRate").innerHTML = "current rate [0.1 (lowest) and 10 (highest)]: " + msg.rate;
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
    
    document.getElementById("currRate").innerHTML = "current rate [0.1 (lowest) and 10 (highest)]: " + msg.rate;
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
    
    document.getElementById("currPitch").innerHTML = "current pitch [0 (lowest) and 2 (highest)]: " + msg.pitch;
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
    
    document.getElementById("currPitch").innerHTML = "current pitch [0 (lowest) and 2 (highest)]: " + msg.pitch;
}

// laguage voice speaks in
function changeLanguage() {
    var currLang = msg.lang;
}

// what the voice will say
function changeText() {
    currText = msg.text;
}

// test what the voice sounds like
function playVoice() {
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

// testing the voice
// https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h
function ttsTest() {
    
    if ('speechSynthesis' in window) {
        // Speech Synthesis supported 
        
        msg.text = "Testing text to speech";
        synth.speak(msg);
    } else {
        // Speech Synthesis Not Supported 
        alert("Sorry, your browser doesn't support text to speech!");
    }

    
}


// https://stackoverflow.com/questions/17931843/assign-a-javascript-variable-value-depends-on-html-drop-down-list-section
function changeHiddenInput(objDropDown) {
    
    var objHidden = document.getElementById("hiddenInput");
    objHidden.value = objDropDown.value;
    var lang = objHidden.value;
    // result.innerHTML = lang || "";



    if (lang == "English") {
        msg.lang = 'en-US';
    } else if (lang == "French") {
        msg.lang = 'fr-FR';
    } else if (lang == "Italian") {
        msg.lang = 'it-IT';
    } else if (lang == "Spanish") {
        msg.lang = 'es-PR';
    } else if (lang == "Portuguese") {
        msg.lang = 'pt-BR';
    } else if (lang == "Russian") {
        msg.lang = 'ru-RU';
    } else if (lang == "Chinese") {
        msg.lang = 'cmn-Hans-CN';
    } else if (lang == "Japanese") {
        msg.lang = 'ja-JP';
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
            output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
            output.classList.remove("hide");
        };
      
         // start recognition
         recognition.start();
  }