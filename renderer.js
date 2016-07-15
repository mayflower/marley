// listen to events
let electron = require('electron');
let fs = require('fs');

let ElementFactory = require('./js/classes/ElementFactory');
let IniSection = require('./js/classes/IniSection');
let IniElement = require('./js/classes/IniElement');

initializeSortables();

function initializeSortables() {

    $(".sortable-values").sortable({
        connectWith: '.sortable-values'
    });
    $("#sortable-sections").sortable({
        handle: '.panel-heading'
    });
}

electron.ipcRenderer.on('openFile', function (sender, fileName) {
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
                lastSection.children.push(element);
            }
        });
        let $sections = $("#sortable-sections");
        $sections.empty();
        sections.forEach(
            section => {
                let $section = $(section.render());
                $sections.append($section);
                $section.addClass(IniSection.cssClass).data('section', section);
            }
        );
        initializeSortables();
    });
});

electron.ipcRenderer.on('saveFile', function (sender, fileName) {
    /** @var {IniSection[]} */
    let sections = $('.' + IniSection.cssClass).toArray().map((section) => $(section).data('section'));

    let fileContents = sections.map((section) => section.toIni()).join("\n");
    fileContents = fileContents.replace(/^\[]\n/, ""); // remove empty section header [] at the start of the file

    console.log(fileContents);
});

