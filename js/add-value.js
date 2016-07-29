const $ = require('jquery');
const IniSection = require('./classes/IniSection');
const IniComment = require('./classes/IniComment');
const IniValue = require('./classes/IniValue');

const OPTION_COMMENT = "0";
const OPTION_VALUE = "1";

$(document).on('click', '.collapse-button', function () {
    let $this = $(this);
    let $collapseParents = $this.closest('.collapse-parent');
    $collapseParents.find('.collapse.' + $this.data('collapseClass')).collapse('toggle').siblings('.collapse').collapse('hide');
});

$(document).on('click', '.value-add', function () {
    let $addForm = $(this).closest('.add-form');

    let iniElement;

    if ($addForm.hasClass('comment')) {
        let comment = $addForm.find('.input-comment').val();
        iniElement = new IniComment(comment);
    } else if ($addForm.hasClass('value')) {
        let key = $addForm.find('.input-key').val();
        let value = $addForm.find('.input-value').val();

        if (!key.match(/^([A-Z]+_)*[A-Z]+$/)) {
            alert('Bitte einen Schlüssel eingeben, der nur aus Großbuchstaben und Unterstrichen besteht.');
        } else {
            iniElement = new IniValue(key, value);
        }
    } else if ($addForm.hasClass('section')) {
        let section = $addForm.find('.input-section').val();
        iniElement = new IniSection(section);

        $('#sortable-sections').append(iniElement.render());
        return;
    }

    IniSection.findClosestSection($addForm).addChild(iniElement);
});