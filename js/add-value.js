const $ = require('jquery');
const IniSection = require('./classes/IniSection');
const IniComment = require('./classes/IniComment');
const IniValue = require('./classes/IniValue');

const OPTION_COMMENT = "0";
const OPTION_VALUE = "1";

$(document).on('click', '.value-add', function () {
    let $addForm = $(this).parents('.add-value').first();

    let selectOpt = $addForm.find('.value-select').first().val();
    let value = $addForm.find('.value-text').first().val();

    let iniElement;
    switch (selectOpt) {
        case OPTION_COMMENT:
            iniElement = new IniComment(`;${value}`);
            break;
        case OPTION_VALUE:
            iniElement = addNewValue(value);
            break;
        default:
            throw "unknown dropdown value";
    }

    IniSection.findClosestSection($addForm).addChild(iniElement);
});

/**
 * check if input value matches regex
 *
 * @param {string} value
 * @returns {IniValue|null}
 */
function addNewValue(value) {
    let regEx = /^[A-Z_]+$/;
    console.log(value.match(regEx));
    if (value.match(regEx)) {
        return new IniValue(`${value}=`);
    } else {
        alert("Platzhalter entspricht nicht der Form /^[A-Z_]+$/");
    }

    return null;
}