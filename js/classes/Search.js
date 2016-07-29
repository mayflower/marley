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

    let searchContent = "";
    let entries = $('li.has-ini-element');
    entries.each(function () {
        searchContent = "";

        let $that = $(this);
        let element = IniElement.getElement($(this));

        if (element instanceof IniValue) {
            searchContent = `${element.name} ${element.value}`;
        } else if (element instanceof IniComment) {
            searchContent = element.comment;
        } else if (element instanceof IniSection) {
            // TODO hide empty sections
            return;
        }

        searchContent = searchContent.toLowerCase();

        if (searchContent.indexOf(searchQuery) === -1) {
            $that.hide();
        } else {
            $that.show();
        }
    });
}