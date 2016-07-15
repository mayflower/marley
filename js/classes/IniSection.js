const IniElement = require('./IniElement');
const $ = require('jquery');

/**
 * @class
 */
module.exports = class IniSection extends IniElement {
    constructor(line) {
        super(line);
    }

    static get cssClass(){
        return 'section-element';
    }

    addChild(child){
        this.$element.find('.children').append(child.$element);
    }

    /**
     * @return {IniElement[]}
     */
    get children(){
        return IniElement.findElements(this.$element.find('.children'));
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
                <ul class="sortable-values children">
                </ul>
                <div class="form-group add-value">
                    <div class="row">
                        <div class="name col-sm-2">
                            <select class="form-control value-select">
                                <option value="1" selected>Übersetzung</option>
                                <option value="0">Kommentar</option>
                            </select>
                        </div>
                        <div class="name col-sm-9">
                            <textarea class="form-control value-text" rows="1" placeholder="Platzhalter oder Kommentar-Text"></textarea>
                        </div>
                        <div class="name col-sm-1">
                            <button type="button" class="btn btn-default value-add">Hinzufügen</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>`);

        let $name = $ret.find('.name');
        $name.change(()=> {
            this.name = $name.val();
        });

        return $ret;
    }

    toIni() {
        return `[${this.name}]\n` + this.children.map((child) => child.toIni()).join("\n");
    }

    static get regex() {
        return /^\s*\[(.*)\]\s*$/;
    }

    /**
     *
     * @param  {jQuery} $items
     * @return {IniSection[]}
     */
    static findSections($items){
        return $items.find('.' + IniSection.cssClass).toArray().map((section) => $(section).data('section'));
    }

    /**
     *
     * @param {jQuery} $item
     * @return {IniSection}
     */
    static findClosestSection($item){
        return $item.closest('.' + IniSection.cssClass).data('section');
    }
};