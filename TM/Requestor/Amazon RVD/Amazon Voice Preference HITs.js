// ==UserScript==
// @name         Amazon Voice Preference HITs Macro
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  A macro that allows the Amazon Speech Preference HITs to be used with the keyboard
// @author       Kyle
// @match        https://rvd.ivonaservice.com/mturk/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

$(function() {
    "use strict";
  
    var Page = (function () {
  
      //PRIVATE MEMBERS
  
      var button = {
        player1Button: $("#playerButton-player1") [0],
        player2Button: $("#playerButton-player2") [0],
        preference1: $("#preference1"),
        preference2: $("#preference2"),
        preference3: $("#preference3"),
        preference4: $("#preference4"),
        preferenceSame: $("#preference5"),
        prefUndecided: $("#preference6"),
        submitButton: $("#submit") [0]
      };
  
      var enableSubmit = function () {
        submit.enable("player-player1");
        submit.enable("player-player2");
      };
      enableSubmit();
  
      //PUBLIC MEMBERS
  
      this.submitPage = function() {
        //Make sure that a selection is made before submitting
        if ((button.preference1[0] === undefined || !button.preference1[0].checked) &&
            (button.preference2[0] === undefined || !button.preference2[0].checked) &&
            (button.preference3[0] === undefined || !button.preference3[0].checked) &&
            (button.preference4[0] === undefined || !button.preference4[0].checked) &&
            (button.preferenceSame[0] === undefined || !button.preferenceSame[0].checked) &&
            (button.prefUndecided[0] === undefined || !button.prefUndecided[0].checked)) {
  
          window.alert("You need to select an option");
          return;
  
        } else {
          $(button.submitButton)[0].click();
        }
      };
  
      this.select = function(selection) {
        button[selection].click();
      };
  
    });
  
    var form = new Page();
  
    function buttonPress(button) {
      if (button.defaultPrevented) {
        return;
      }
      switch (button.key) {
        case "1":
          form.select("player1Button");
          break;
        case "2":
          form.select("player2Button");
          break;
  
        case "q":
          form.select("preference1");
          break;
        case "w":
          form.select("preference2");
          break;
        case "e":
          form.select("preference3");
          break;
        case "r":
          form.select("preference4");
          break;
  
        case "t":
          form.select("preferenceSame");
          break;
        case "y":
          form.select("prefUndecided");
          break;
  
        case "Enter":
          //Use this function to make sure that a selection has been made prior to submitting
          form.submitPage();
          break;
        default:
          return;
      }
      button.preventDefault();
    }
    window.addEventListener("keydown", buttonPress, true);
  })();