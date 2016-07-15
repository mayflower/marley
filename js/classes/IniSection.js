let IniElement = require('./IniElement');

/**
 * @class
 * @property {IniElement[]} children
 */
module.exports = class IniSection extends IniElement {
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