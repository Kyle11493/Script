window.$ = function(selector) {
    var selectorType = "querySelectorAll";
    if(selector.indexOf("#") === 0) {
        selectorType = "getElementById";
        selector = selector.substr(1, selector.length);
    }
    document[selectorType](selector);
}