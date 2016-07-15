const $ = require('jquery');
const IniElement = require('./classes/IniElement');
const IniSection = require('./classes/IniSection');
const IniComment = require('./classes/IniComment');
const IniValue = require('./classes/IniValue');

$(document).on('click', '.remove-value', function () {
    let $value = $(this).parents('li').first();

    let isConfirmed = confirm(getConfirmationMessage($value));
    if (isConfirmed) {
        $value.remove();
    }
});

/**
 * @param {jQuery} $value
 * @returns {string}
 */
function getConfirmationMessage($value) {
    let name = 'diesen Eintrag';
    let element = IniElement.getElement($value);
    if (element instanceof IniSection) {
        name = `die Sektion "${element.name.trim()}"`;
    } else if (element instanceof IniValue) {
        name = `den Platzhalter "${element.name.trim()}"`;
    } else if (element instanceof IniComment) {
        name = `den Kommentar "${element.comment.trim()}"`;
    }

    return `Wollen Sie ${name} wirklich löschen?`;
}
