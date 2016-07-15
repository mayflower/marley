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
        /** @var {IniSection[]} */
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
     * @returns {jQuery}
     */
    render() {
        throw "implement me!";
    }

    /**
     * @returns {string}
     */
    toIni() {
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

    static get cssClass(){
        return 'section-element';
    }

    /**
     * @returns jQuery
     */
    render() {
        let $ret = $(`
        <li class="panel panel-default">
            <div class="panel-heading">
                <button type="button" class="btn btn-default toggle-collapse"><i class="glyphicon glyphicon-chevron-up"></i></button>
                <textarea class="form-control name" rows="1">${this.name}</textarea>
            </div>
            <div class="panel-body">
                <ul class="sortable-values">
                </ul>
            </div>
        </li>`);

        let $name = $ret.find('.name');
        $name.change(()=> {
            this.name = $name.val();
        });

        let $appendTo = $ret.find('.sortable-values');
        this.children.forEach(child => {
            let $element = child.render();
            $element.appendTo($appendTo);
        });
        return $ret;
    }

    toIni() {
        return `[${this.name}]\n` + this.children.map((child) => child.toIni()).join("\n");
    }

    static get regex() {
        return /^\s*\[(.*)\]\s*$/;
    }
}
class IniComment extends IniElement {
    static get regex() {
        return /^;(.*)/;
    }

    toIni() {
        return `;${this.name}`;
    }

    render() {
        let $element = $(`
        <li class="ini-comment"><div class="row">
            <div class="col-sm-1">;</div>
            <div class="col-sm-11"><textarea class="form-control name" rows="1">${this.name}</textarea></div>
        </div></li>`);

        let $name = $element.find('.name');
        $name.change(()=> {
            this.name = $name.val();
        });

        return $element;
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
        this.value = matches[2].replace(/"_QQ_"/g, '"').replace(/\\n/g, "\n");
    }

    toIni() {
        return `${this.name}="${this.value}"`;
    }

    render() {
        let $element = $(`
        <li><div class="row">
            <div class="name col-sm-3">${this.name}</div>
            <div class="col-sm-9"><textarea class="form-control value">${this.value}</textarea></div>
        </div></li>`);

        let $value = $element.find('.value');
        $value.change(() => {
            this.value = $value.val();
        });

        return $element;
    }
}
