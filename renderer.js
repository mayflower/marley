// listen to events
let electron = require('electron');
let fs = require('fs');

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
        let sections = [];
        let lines = data.split("\n");

        let lastSection = new IniSection('[]');
        sections.push(lastSection);

        lines.forEach(function (line) {
            let element = IniElement.getElement(line);
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
            section => $sections.append(section.render())
        );
        initializeSortables();
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

    /**
     * @returns jQuery
     */
    render() {
        throw "implement me!";
    }

    static getElement(line) {
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

/**
 * @class
 * @property {IniElement[]} children
 */
class IniSection extends IniElement {
    constructor(line) {
        super(line);
        this.children = [];
    }

    /**
     * @returns jQuery
     */
    render() {
        let $ret = $(`
        <li class="panel panel-default">
            <div class="panel-heading">
                <button type="button" class="btn btn-default toggle-collapse"><i class="glyphicon glyphicon-chevron-up"></i></button>
                <textarea class="form-control" rows="1">${this.name}</textarea>
            </div>
            <div class="panel-body">
                <ul class="sortable-values">
                </ul>
            </div>
        </li>`);
        let $appendTo = $ret.find('.sortable-values');
        this.children.forEach(child => {
            let $element = child.render();
            $element.appendTo($appendTo);
        });
        return $ret;
    }

    static get regex() {
        return /^\s*\[(.*)\]\s*$/;
    }
}
class IniComment extends IniElement {
    static get regex() {
        return /^;(.*)/;
    }

    render() {
        return $(`
        <li class="ini-comment"><div class="row">
            <div class="col-sm-1">;</div>
            <div class="col-sm-11"><textarea class="form-control" rows="1">${this.name}</textarea></div>
        </div></li>`);
    }
}
/**
 * @class
 * @property {string} value
 */
class IniValue extends IniElement {
    static get regex() {
        return /^\s*(.*?)="?(.*?)"?\s*$/;
    }

    constructor(line) {
        super(line);
        let matches = line.match(this.constructor.regex);
        this.value = matches[2].replace(/"_QQ_"/g,'"').replace(/\\n/g,"\n");
    }

    render() {
        return $(`
        <li><div class="row">
            <div class="name col-sm-3">${this.name}</div>
            <div class="value col-sm-9"><textarea class="form-control">${this.value}</textarea></div>
        </div></li>`);
    }
}
