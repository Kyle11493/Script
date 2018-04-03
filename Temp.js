function unbindevent() {
    $Document.off("click keyup", delayVideoReplacementCall);
    $SubmitButton.off("click", unbindEvent);
}

function bindEvent() {
    $Document.on("click keyup", delayVideoReplacementCall);
    $SubmitButton.on("click", unbindevent);
}

//DOM Cache
".container" //Too broad
"#definitionButton" //Page Verification
"#instrDiv"  //Return message and posting video category
".question"  //video category
"#submitButton"  //Unbind events
$(".focus")[0].id


//array of the video container elements to be changed when replaceVideo is callled

