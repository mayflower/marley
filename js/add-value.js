const $ = require('jquery');
const IniSection = require('./classes/IniSection');
const IniComment = require('./classes/IniComment');
const IniValue = require('./classes/IniValue');

const OPTION_COMMENT="0";
const OPTION_VALUE="1";

$(document).on('click', '.value-add', function () {
    let $addForm = $(this).parents('.add-value').first();

    let selectOpt = $addForm.find('.value-select').first().val();
    let value = $addForm.find('.value-text').first().val();

    let iniElement;
    switch(selectOpt){
        case OPTION_COMMENT:
            iniElement = new IniComment(`;${value}`);
            break;
        case OPTION_VALUE:
            iniElement = new IniValue(`${value}=`);
            break;
        default:
            throw "unknown dropdown value";
    }

    IniSection.findClosestSection($addForm).addChild(iniElement);
});
