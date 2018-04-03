// ==UserScript==
// @name         Amazon RVD HITs Panda Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirects the main mTurk page to the JR Panda Crazy page to start searching for the next batch of HITs
// @author       Kyle
// @match        https://worker.mturk.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  window.location.href = "https://worker.mturk.com/requesters/PandaCrazy/projects";
})();