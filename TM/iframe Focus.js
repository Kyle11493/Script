// ==UserScript==
// @name         iframe Focus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sets the focus on the work iframe on MTurk
// @author       Kyle
// @match        https://worker.mturk.com/projects/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
	if ($(".embed-responsive-item")[0] !== undefined) {
		$(".embed-responsive-item")[0].focus();
	} else {
      return;
	}

})();