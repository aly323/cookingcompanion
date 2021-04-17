// https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h

function ttsTest() {


    if ('speechSynthesis' in window) {
        // Speech Synthesis supported 
        var msg = new SpeechSynthesisUtterance();
        msg.text = "Testing text to speech";
        window.speechSynthesis.speak(msg);
    }else {
        // Speech Synthesis Not Supported 
        alert("Sorry, your browser doesn't support text to speech!");
    }

    
}