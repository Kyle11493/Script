// ==UserScript==
// @name         Amazon Voice Preference HITs Macro
// @namespace    http://tampermonkey.net/
// @version      1.3.0
// @description  A macro that allows the Amazon Speech Preference HITs to be used with the keyboard
// @author       Kyle
// @match        https://rvd.ivonaservice.com/mturk/*
// @grant        none
// ==/UserScript==

(function() {
    "use strict";
  
    var cache = {
      player1Button: document.getElementById("playerButton-player1"),
      player2Button: document.getElementById("playerButton-player2"),
      preference1: document.getElementById("preference1"),
      preference2: document.getElementById("preference2"),
      preference3: document.getElementById("preference3"),
      preference4: document.getElementById("preference4"),
      preferenceSame: document.getElementById("preference5"),
      preferenceUndecided: document.getElementById("preference6"),
      submitButton: document.getElementById("submit"),
  };
  var selectionMade = false;
  
  class Button {
      constructor(element) {
          this.element = element;
      }
      select() {
          this.element.click();
      }
  }
  class Player extends Button {
      constructor(element) {
          super(element);
      }
  }
  class Preference extends Button {
      constructor(element) {
          super(element);
      }
      select() {
          this.element.click();
          selectionMade = true;
      }
  }
  class SubmitButton extends Button {
      constructor(element) {
          super(element);
      }
      select() {
          if (selectionMade) {
              unbindEvents();
              this.element.click();
          } else {
              window.alert("You need to make a selection.");
          }
      }
  }
  
  var buttons = {
      1: new Player(cache.player1Button),
      2: new Player(cache.player2Button),
      q: new Preference(cache.preference1),
      w: new Preference(cache.preference2),
      e: new Preference(cache.preference3),
      r: new Preference(cache.preference4),
      t: new Preference(cache.preferenceSame),
      y: new Preference(cache.preferenceUndecided),
      Enter: new SubmitButton(cache.submitButton)
  };
  
  function pageInitialization() {
      enableSubmit();
      bindEvents();
  }
  pageInitialization();
  function enableSubmit() {
      submit.enable("player-player1");
      submit.enable("player-player2");
  }
  function bindEvents() {
      document.addEventListener("keydown", buttonPress);
  }
  function unbindEvents() {
      document.removeEventListener("keydown", buttonPress);
  }
  
  function buttonPress(keydownEvent) {
      if(keydownEvent.defaultPrevented) {
          return;
      }
      buttons[keydownEvent.key].select();
      keydownEvent.preventDefault();
  }
  })();