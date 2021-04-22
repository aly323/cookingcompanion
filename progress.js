var progress = 0;

// update progress bar
function updateProgress() {
    var instructionNum = 8;
    var increment = 100 / instructionNum;
    var newprogress = progress + increment;


    progress = newprogress;
    // change how much the bar is filled
    $('#progress-bar').attr('aria-valuenow', newprogress).css('width', newprogress+'%');

    // change text on the bar
    document.getElementById("progress-bar").innerHTML = newprogress + "%";
}