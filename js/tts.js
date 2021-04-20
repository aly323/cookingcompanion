// https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h

function ttsTest() {
    
    if ('speechSynthesis' in window) {
        // Speech Synthesis supported 
        
        msg.text = "Testing text to speech";
        synth.speak(msg);
    }else {
        // Speech Synthesis Not Supported 
        alert("Sorry, your browser doesn't support text to speech!");
    }

    
}