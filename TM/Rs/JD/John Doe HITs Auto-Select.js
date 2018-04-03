// ==UserScript==
// @name         John Doe HITs Auto-Select
// @namespace    http://tampermonkey.net/
// @version      1.3.0
// @description  Selects the most common answers automatically
// @author       Kyle
// @match        https://www.google.com/evaluation/endor/mturk*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==


$(function() {
    "use strict";
    
    if(!isJohnDoeHit) {
        return;
    }
    function isJohnDoeHit() {
        return ($("#video-placeholder").length === 0);
    }

    var videoLoadDelayTimeMilliseconds = 1000;

    function DomCache() {
        this.body = $("body");
        this.videoPlaceholder = this.body.find("#video-placeholder")[0];
        this.inputElements = this.body.find("input");
        this.playableYes = this.inputElements[3];
        this.playableNo = this.inputElements[4];
        this.speechEnglish = this.inputElements[5];
        this.speechForiegn = this.inputElements[6];
        this.speechBoth = this.inputElements[7];
        this.speechNone = this.inputElements[8];
        this.textEnglish = this.inputElements[9];
        this.textForiegn = this.inputElements[10];
        this.textBoth = this.inputElements[11];
        this.textNone = this.inputElements[12];
        this.sensetiveYes = this.inputElements[13];
        this.sensetiveNo = this.inputElements[14];
        this.sensetiveMaybe = this.inputElements[15];
        this.submitButton = this.inputElements[37];
    }
    var domCache = new DomCache();
    var buttonByKeycode = {
        49: domCache.speechEnglish,
        50: domCache.speechForiegn,
        51: domCache.speechBoth,
        52: domCache.speechNone,
        81: domCache.textEnglish,
        87: domCache.textForiegn,
        69: domCache.textBoth,
        82: domCache.textNone 
    };
    function preset() {
        selectMostCommonAnswers();
        startVideoLoadDelay();
        bindEvents();
    }
    
    function selectMostCommonAnswers() {
        select(domCache.playableYes);
        select(domCache.speechForiegn);
        select(domCache.textForiegn);
        select(domCache.sensetiveNo);
    }
    function select(button) {
        button.click();
    }
    
    function startVideoLoadDelay() {
        setTimeout(loadVideo, videoLoadDelayTimeMilliseconds);
    }
    function loadVideo() {
        domCache.videoPlaceholder.click();
    }
    
    function bindEvents() {
        domCache.body.on("keydown", checkIfSubmit);
    }
    function checkIfSubmit(button) {
        if (button.which === 13) {
            submit();
        } else {
            selectButton(button.which);
        }
    }
    function selectButton(buttonKeycode) {
        select(buttonByKeycode[buttonKeycode]);
    }
    
    function submit() {
        unbindEvents();
        select(domCache.submitButton);
    }
    function unbindEvents() {
        domCache.body.off("keydown", checkIfSubmit);
    }
    preset();
})();


