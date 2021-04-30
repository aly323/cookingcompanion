var progress = 0;

// the notes start off unstriked
var supply1noteStrike = false;
var sauce2noteStrike = false;

// update progress bar
function updateProgress(stepNum, isCrossed) {
    var instructionNum = 8;
    var increment = 100 / instructionNum;
    
    var newprogress;

    if (isCrossed != true)
        newprogress = progress + increment;
    else
        newprogress = progress - increment;

    progress = newprogress;
    // change how much the bar is filled
    $('#progress-bar').attr('aria-valuenow', newprogress).css('width', newprogress+'%');

    // change text on the bar
    newprogress_rounded = Math.round(newprogress * 100) / 100;
    document.getElementById("progress-bar").innerHTML = newprogress_rounded + "%";
}

// will cross-off and change the text color of the completed steps
function crossoff(stepNum, clr) {

    // not yet crossed off...
    if (stepNum.style.color != clr) {
        stepNum.style.color = clr;
        stepNum.style.textDecoration = "line-through";

        updateProgress(stepNum, false);

    } else {
        stepNum.style.color = 'black';
        stepNum.style.textDecoration = "none";

        updateProgress(stepNum, true);
    }
}

// cross-off the note underneath the checkbox
function crossOffSupplyNote() {
    var supply1 = document.getElementById("supply1");
    var supply1note = document.getElementById("supply1note");
    

    if (supply1noteStrike) { // note is currently striked
        supply1note.style.textDecoration = "none";
        supply1noteStrike = false;
    } else {
        supply1note.style.textDecoration = "line-through";
        supply1noteStrike = true;
    }


}


// cross-off the note underneath the checkbox
function crossOffSauceNote() {
    var sauce2 = document.getElementById("sauce2");
    var sauce2note = document.getElementById("sauce2note");


    if (sauce2noteStrike) { // note is currently striked
        sauce2note.style.textDecoration = "none";
        sauce2noteStrike = false;
    } else {
        sauce2note.style.textDecoration = "line-through";
        sauce2noteStrike = true;
    }


}