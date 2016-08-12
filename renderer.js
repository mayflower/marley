const electron = require('electron');
const settings = require('electron-settings');
const fs = require('fs');
const $ = require('jquery');
require('jquery-ui/sortable');

const ElementFactory = require('./js/classes/ElementFactory');
const IniSection = require('./js/classes/IniSection');
const IniElement = require('./js/classes/IniElement');
const Search = require('./js/classes/Search');

initializeSortables();

Search.init();

function initializeSortables() {
    $("#sortable-sections").sortable({
        handle: '.panel-heading'
    });
}

function readFile(fileName) {
    let allSettings = settings.getSync();
    fs.readFile(fileName, 'utf-8', function (err, data) {
        /** @var {IniSection[]} */
        let sections = [];
        let lines = data.split("\n");

        let lastSection = new IniSection('');
        sections.push(lastSection);

        lines.forEach(function (line) {
            let element = ElementFactory.getElement(line, allSettings);
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
                $sections.append(section.$element);
            }
        );

        $('#file-name').text(fileName);
        initializeSortables();
    });
}

function saveFile(target) {
    let allSettings = settings.getSync();

    /** @var {IniSection[]} */
    let sections = IniSection.findSections($(document));

    let fileContents = sections.map((section) => section.toIni(allSettings)).join("\n");
    fileContents = fileContents.replace(/^\[]\n/, ""); // remove empty section header [] at the start of the file

    if (typeof target == "string") {
        fs.writeFile(target, fileContents, (err) => {
            if (err) {
                console.log(err);
                alert("Speichern ist fehlgeschlagen:\n" + err);
            } else {
                alert("erfolgreich gespeichert als " + target);
            }
        });
    } else if (target instanceof Function) {
        target(fileContents);
    } else {
        console.log(fileContents);
    }
}

electron.ipcRenderer.on('openFile', (sender, fileName) => readFile(fileName));
electron.ipcRenderer.on('saveFile', (sender, fileName) => saveFile(fileName));
electron.ipcRenderer.on('saveConsole', (sender, fileName) => saveFile());


const initialFile = "./example.ini";
fs.access(initialFile, fs.R_OK, function (err) {
    if (!err) {
        console.log(`file "${initialFile}" exists, loading`);
        readFile(initialFile);
    } else {
        console.log(`there is no file named "${initialFile}" , starting with an empty window`);
    }
});

