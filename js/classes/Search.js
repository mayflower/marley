const $ = require('jquery');
const IniElement = require('./IniElement');
const IniComment = require('./IniComment');
const IniValue = require('./IniValue');
const IniSection = require('./IniSection');

module.exports.init = function () {
    "use strict";
    addEventHandlers();
}

function addEventHandlers() {
    let searchField = $('.search-query');

    $('.search-query').keyup(function () {
        filterFile();
    });

    searchField.change(function () {
        filterFile();
    });
};

function filterFile() {
    let searchQuery = $('.search-query').val();
    searchQuery = searchQuery.toLowerCase();

    let entries = $('li.has-ini-element');
    entries.each(function () {
        let $that = $(this);
        let element = IniElement.getElement($that);

        if(element.search(searchQuery)) {
            $that.show();
        } else {
            $that.hide();
        }
    });
}