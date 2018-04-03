// ==UserScript==
// @name         Places Database HIT
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  Script for Places Database HITs
// @author       Kyle
// @match        https://www.mturkcontent.com/dynamic/hit?assignmentId=*
// @grant        none
// ==/UserScript==

//data object contains all the videos
//video objects with an a attribute are known and must be correct
//video objects with a b attribute are not known and are the HITs focus

(function() {
  'use strict';

  if(!isVideoRecognitionHit) {
    return;
  } else {
    pageInitiation();
  }
  function isVideoRecognitionHit() {
    return $("#definitionButton") !== undefined;
  }
  function pageInitiation() {
    showQuestion();
    if (!hitHasKnownAnswers()) {
      createReturnInstruction();
    }
    createEvent();
  }
  function showQuestion() {
    var questionDiv = $(".question")[0];
    $("#instrDiv").prepend(questionDiv);
  }

  function hitHasKnownAnswers() {
    for(var i = 0; i < data.length; i++) {
      if(data[i].hasOwnProperty("a")) {
        return true;
      }
    }
    return false;
  }
  function createReturnInstruction() {
    $("#instrDiv")[0].innerHTML = "This HIT does not contain known answers on the client side.  To prevent a potential block it is recommended that you return this HIT.";
  }

  //Replace global getTodoCnt to return 0 to show the number of incorrect answers at the start
  window.getTodoCnt = function() {
    return 0;
  };

  function getAnswer(dataIndex) {
    var answer = {
      index: dataIndex,
      value: data[dataIndex].a
    };
    answer.text = (answer.value) ? "YES" : "NO";
    return answer;
  }

  //videoContainerId is a string ending in either a one or two digit number
  function getVideoContainerIndex(videoContainerId) {
    var videoContainerIndex = (Number.isNaN(parseInt(videoContainerId.slice(-2)))) ? parseInt(videoContainerId.slice(-1)) : parseInt(videoContainerId.slice(-2));
    return videoContainerIndex;
  }

  function replaceVideo(videoContainerId) {
    var videoContainerIndex = getVideoContainerIndex(videoContainerId);
    if(data[videoContainerIndex].a !== undefined) {
      var videoContainer = $("#" + videoContainerId)[0];
      var answer = getAnswer(videoContainerIndex);
      $(videoContainer)[0].innerHTML = answer.text;
    }
  }
  function createEvent() {
    $(document).on("click keyup", delayVideoReplacementCall);
  }
  function delayVideoReplacementCall() {
    setTimeout(replaceFocusedVideoContainer, 1);
  }
  function replaceFocusedVideoContainer() {
    if(videoContainerIsFocused()) {
      replaceVideo(getActiveVideoContainerId());
    }
  }
  function videoContainerIsFocused() {
    return $(".focus")[0] !== undefined;
  }
  function getActiveVideoContainerId() {
    return $(".focus")[0].id;
  }
})();