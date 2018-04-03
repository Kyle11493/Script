function submit() {
	if (isSelectionMade()) {
		$(button.submitButton)[0].click();
	} else {
		displayNoSelectionMessage();
	}
}
function isSelectionMade() {
	return !((button.preference1[0] === undefined || !button.preference1[0].checked) &&
		(button.preference2[0] === undefined || !button.preference2[0].checked) &&
		(button.preference3[0] === undefined || !button.preference3[0].checked) &&
		(button.preference4[0] === undefined || !button.preference4[0].checked) &&
		(button.preferenceSame[0] === undefined || !button.preferenceSame[0].checked) &&
		(button.prefUndecided[0] === undefined || !button.prefUndecided[0].checked));
}
function displayNoSelectionMessage() {
	alert("You need to select an option.");
}







function loadHotkeySettings() {
	var keycodeElement = {};
	linkKeycodeToElement();
}

function linkKeycodeToElement() {

}



$(document).keydown(button, function () {
	if (button.defaultPrevented) {
		return;
	}
	pressButton(button.which);
	button.preventDefault();
});
function pressButton(keyCode) {

}

var keycodeOf = {
	player1Button: 49,
	player2Button: 50,
	submitButton: 13,
	preference1: 81,
	preference2: 87,
	preference3: 69,
	preference4: 82,
	preferenceSame: 84,
	preferenceUndecided: 89
};
// player1Button: $("#playerButton-player1") [0],
//         player2Button: $("#playerButton-player2") [0],
//         preference1: $("#preference1"),
//         preference2: $("#preference2"),
//         preference3: $("#preference3"),
//         preference4: $("#preference4"),
//         preferenceSame: $("#preference5"),
//         prefUndecided: $("#preference6"),
//         submitButton: $("#submit") [0]

function createButtonGroup() {
	var buttonGroup = {};
	buttonGroup[keycodeOf.player1Button] = new Player($("#playerButton-player1")[0]);
	buttonGroup[keycodeOf.player2Button] = new Player($("#playerButton-player2")[0]);
	buttonGroup[keycodeOf.preference1] = new Preference($("#preference1"));
	buttonGroup[keycodeOf.preference2] = new Preference($("#preference2"));
	buttonGroup[keycodeOf.preference3] = new Preference($("#preference3"));
	buttonGroup[keycodeOf.preference4] = new Preference($("#preference4"));
	buttonGroup[keycodeOf.preferenceSame] = new Preference($("#preference5"));
	buttonGroup[keycodeOf.preferenceUndecided] = new Preference($("#preference6"));
	buttonGroup[keycodeOf.submitButton] = new SubmitButton($("#submit")[0]);

}
class Button {
	constructor(element) {
		this.element = element;
	}
}

class Preference extends Button {
	constructor(element) {
		super(element);
	}
	//has submit verification method
}

class Player extends Button {
	constructor(element) {
		super(element);
		
	}
}

class SubmitButton extends Button {
	constructor(element) {
		super(element);
	}
	//has own select method
}