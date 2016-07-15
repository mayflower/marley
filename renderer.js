const electron = require('electron');
const fs = require('fs');
const $ = require('jquery');
require('jquery-ui/sortable');

const ElementFactory = require('./js/classes/ElementFactory');
const IniSection = require('./js/classes/IniSection');
const IniElement = require('./js/classes/IniElement');

initializeSortables();

function initializeSortables() {

    $(".sortable-values").sortable({
        connectWith: '.sortable-values'
    });
    $("#sortable-sections").sortable({
        handle: '.panel-heading'
    });
}

function readFile(fileName) {
    fs.readFile(fileName, 'utf-8', function (err, data) {
        /** @var {IniSection[]} */
        let sections = [];
        let lines = data.split("\n");

        let lastSection = new IniSection('[]');
        sections.push(lastSection);

        lines.forEach(function (line) {
            let element = ElementFactory.getElement(line);
            if (element instanceof IniSection) {
                lastSection = element;
                sections.push(element);
            } else if (element instanceof IniElement) {
                lastSection.addChild(element);
            }
        });
        let $sections = $("#sortable-sections");
        $sections.empty();
        sections.forEach(
            section => {
                let $section = $(section.$element);
                $sections.append($section);
                $section.addClass(IniSection.cssClass).data('section', section);
            }
        );

        $('#file-name').text(fileName);
        initializeSortables();
    });
}

function saveFile(fileName) {
    /** @var {IniSection[]} */
    let sections = IniSection.findSections($(document));

    let fileContents = sections.map((section) => section.toIni()).join("\n");
    fileContents = fileContents.replace(/^\[]\n/, ""); // remove empty section header [] at the start of the file

    console.log(fileContents);
}

electron.ipcRenderer.on('openFile', (sender, fileName) => readFile(fileName));

electron.ipcRenderer.on('saveFile', (sender, fileName) => saveFile(fileName));


const initialFile = "./test.ini";
fs.access(initialFile, fs.R_OK, function (err) {
    if (!err) {
        console.log(`file "${initialFile}" exists, loading`);
        readFile(initialFile);
    } else {
        console.log(`there is no file named "${initialFile}" , starting with an empty window`);
    }
});

