var progress = 0;

// update progress bar
function updateProgress(stepNum, isCrossed) {
    //var instructionNum = 8;
    //var increment = 100 / instructionNum;
    //var newprogress = progress + increment;

    var increment = 10;
    var newprogress;

    if (isCrossed != true)
        newprogress = progress + increment;
    else
        newprogress = progress - increment;

    progress = newprogress;
    // change how much the bar is filled
    $('#progress-bar').attr('aria-valuenow', newprogress).css('width', newprogress+'%');

    // change text on the bar
    document.getElementById("progress-bar").innerHTML = newprogress + "%";
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
