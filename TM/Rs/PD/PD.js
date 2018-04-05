// ==UserScript==
// @name         Places Database HIT
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Script for Places Database HITs
// @author       Kyle
// @match        https://www.mturkcontent.com/dynamic/hit?assignmentId=*
// @grant        none
// ==/UserScript==

//data object contains all the videos
//video objects with an a attribute are known and must be correct
//video objects with a b attribute are not known and are the HITs focus

(function () {
  'use strict';

  if (!isVideoRecognitionHit) {
    return;
  }
  function isVideoRecognitionHit() {
    return document.getElementById("definitionButton") !== null;
  }

  function DomCache() {
    this.instrDiv = document.getElementById("instrDiv");
    this.question = document.getElementById("question");
    this.submitButton = document.getElementById("submitButton");
    this.focus = document.getElementsByClassName("focus");
  }

  var cache = new DomCache();
  const questionStyle = "display:'block',float:'left'";
  const returnMessage = "This HIT does not contain known answers on the client side.  To prevent a potential block it is recommended that you return this HIT.";

  //Replace global getTodoCnt to return 0 to show the number of incorrect answers at the start
  window.getTodoCnt = function () {
    return 0;
  };

  pageInitialization();

  function pageInitialization() {
    showQuestion();
    if (!hitHasKnownAnswers()) {
      createReturnInstruction();
    }
    bindEvent();
  }

  function showQuestion() {
    cache.question.style = questionStyle;
  }

  function hitHasKnownAnswers() {
    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty("a")) {
        return true;
      }
    }
    return false;
  }
  function createReturnInstruction() {
    cache.instrDiv.textContent = returnMessage;
  }

  function bindEvent() {
    document.addEventListener("click", delayVideoReplacementCall);
    document.addEventListener("keyup", delayVideoReplacementCall);
    submitButton.addEventListener("click", unbindevent);
  }
  function unbindevent() {
    document.removeEventListener("click", delayVideoReplacementCall);
    document.removeEventListener("keyup", delayVideoReplacementCall);
    submitButton.removeEventListener("click", unbindEvent);
  }

  function delayVideoReplacementCall() {
    setTimeout(replaceFocusedVideoContainer, 1);
  }

  function replaceFocusedVideoContainer() {
    if (cache.focus[0] !== undefined) {
      replaceVideo();
    }
  }

  function replaceVideo() {
    var videoIndex = getVideoContainerIndex(cache.focus[0].id);
    if (data[videoIndex].hasOwnProperty("a")) {
      var answer = getAnswer(videoIndex);
      cache.focus[0].textContent = answer.text;
    }
  }

  //videoContainerId is a string ending in either a one or two digit number
  function getVideoContainerIndex(videoContainerId) {
    var videoContainerIndex = (Number.isNaN(parseInt(videoContainerId.slice(-2)))) ? parseInt(videoContainerId.slice(-1)) : parseInt(videoContainerId.slice(-2));
    return videoContainerIndex;
  }

  function getAnswer(dataIndex) {
    var answer = {
      index: dataIndex,
      value: data[dataIndex].a
    };
    answer.text = (answer.value) ? "YES" : "NO";
    return answer;
  }
})();