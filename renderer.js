// listen to events
let electron = require('electron');
let fs = require('fs');

$( "#sortable" ).sortable();
$( "#sortable" ).disableSelection();
electron.ipcRenderer.on('openFile', function (sender, fileName) {

    fs.readFile(fileName, 'utf-8', function (err, data) {
        let elements = [];
        let lines = data.split("\n");
        lines.forEach(function (line) {
            let element = IniElement.getElement(line);
            if (element) {
                elements.push(element);
            }
        });
        console.log(elements);

        elements.forEach(function (element) {
            
        });
    });
});

/**
 * @class
 * @property {string} name
 */
class IniElement {
    constructor(line) {
        let matches = line.match(this.constructor.regex);
        this.name = matches[1];
    }

    static getElement(line) {
        console.log(line);
        if (line.match(IniSection.regex)) {
            return new IniSection(line);
        }
        if (line.match(IniComment.regex)) {
            return new IniComment(line);
        }
        if (line.match(IniValue.regex)) {
            return new IniValue(line);
        }
    }
}

class IniSection extends IniElement {
    static get regex() {
        return /^\s*\[(.*)\]\s*$/;
    }
}
class IniComment extends IniElement {
    static get regex() {
        return /^;(.*)/;
    }
}
/**
 * @class
 * @property {string} value
 */
class IniValue extends IniElement {
    static get regex() {
        return /^\s*(.*?)=(.*)\s*$/;
    }

    constructor(line) {
        super(line);
        let matches = line.match(this.constructor.regex);
        this.value = matches[2];
    }
}
