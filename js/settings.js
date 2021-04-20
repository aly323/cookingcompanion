// SOURCE:
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel
// https://www.hongkiat.com/blog/text-to-speech/



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