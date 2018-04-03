// ==UserScript==
// @name         HIT Scraper and Panda Crazy Compatability Script
// @namespace    http://tampermonkey.net/
// @version      0.1.1a
// @description  Create links to automatically add panda jobs in panda crazy
// @author       Kyle
// @match        https://worker.mturk.com/hitScraper
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
  
    //Check if HIT Scraper is loaded then label the new panda buttons
    var checkLoaded = setInterval(function() {
      //Checks how many <tr> elements have loaded should be 0 until HIT Scraper loads, passing false
      if ($("tr").length) {
        //Create new labels for the panda buttons
        $($("tr")[0].children[6]).text("Panda Once");
        $($("tr")[0].children[7]).text("Panda Multiple");
        clearInterval(checkLoaded);
      }
    }, 100);
  
    function createPandaButtons(startIndex) {
      var data = {
        requesterID: $('.nohitDB') [startIndex].dataset.value,
        //Get Group ID from the share buttons in the same result
        groupID: $($('.nohitDB') [startIndex]).parent()[0].childNodes[1].childNodes[0].childNodes[0].dataset.gid,
        onceButton: $('.nohitDB') [startIndex],
        multipleButton: $('.nohitDB') [startIndex + 1],
      };
      (function convertPandaOnce() {
        $(data.onceButton).html('<a href=\'https://worker.mturk.com/requesters/PandaCrazyOnce/projects?JRGID=' + data.groupID + '\' target=\'_blank\' > O </a>');
      }) ();
      (function convertPandaMultiple() {
        $(data.multipleButton).html('<a href=\'https://worker.mturk.com/requesters/PandaCrazyAdd/projects?JRGID=' + data.groupID + '\' target=\'_blank\' > P </a>');
      }) ();
    }
    /*
    results = null;
    reviews = null;
    this.lastScrape = Date.now();
  
    Needs a call to this function in HITScraper on line 1558 or just after the preceeding commented out code
  */
    window.CREATE_PANDA_BUTTONS = function() {
      var hitDBButton = $('.nohitDB');
      for (var i = 0; i < hitDBButton.length; i = i + 2) {
        createPandaButtons(i);
      }
    };
  
  })();