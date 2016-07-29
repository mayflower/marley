const IniElement = require('./IniElement');
const $ = require('jquery');
require('jquery-ui/sortable');

/**
 * @class
 * @property {string} name
 */
module.exports = class IniSection extends IniElement {
    constructor(name) {
        super();
        this.name = name;
    }

    static get cssClass() {
        return 'section-element';
    }

    addChild(child) {
        this.$element.find('.children').append(child.$element);
    }

    /**
     * @return {IniElement[]}
     */
    get children() {
        return IniElement.findElements(this.$element.find('.children'));
    }

    /**
     * @returns jQuery
     */
    render() {
        let $ret = $(`
        <li class="panel panel-default ini-section">
            <div class="panel-heading">
                <div class="col-sm-1 pointer"><i class="fa fa-arrows" aria-hidden="true"></i></div>
                <button type="button" class="btn btn-default toggle-collapse"><i class="glyphicon glyphicon-chevron-up"></i></button>
                <input class="form-control name" rows="1" value="${this.name}"/>
                <button type="button" class="btn btn-default remove-value"><i class="glyphicon glyphicon-minus"></i></button>
            </div>
            <div class="panel-body">
                <ul class="sortable-values children">
                </ul>
                <div class="form-group collapse-parent well well-sm add-button-div">
                    <div class="row">
                        <div class="col-sm-12 add-button-group">
                            <button type="button" class="btn btn-default collapse-button" data-collapse-class="value">Übersetzung hinzufügen</button>
                            <button type="button" class="btn btn-default collapse-button" data-collapse-class="comment">Kommentar hinzufügen</button>
                        </div>
                    </div>
                    <div class="row collapse value add-form">
                        <div class="col-sm-3">
                            <input class="form-control input-key" placeholder="Schlüssel" />
                        </div>
                        <div class="col-sm-7">
                            <textarea class="form-control input-value" rows="1" placeholder="Wert"></textarea>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="form-control btn btn-default value-add">Hinzufügen</button>
                        </div>
                    </div>
                    <div class="row collapse comment add-form">
                        <div class="col-sm-10">
                            <textarea class="form-control input-comment" rows="1" placeholder="Kommentar"></textarea>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="form-control btn btn-default value-add">Hinzufügen</button>
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
    static findSections($items) {
        return $items.find('.' + IniSection.cssClass).toArray().map((section) => $(section).data(IniSection.cssClass));
    }

    /**
     *
     * @param {jQuery} $item
     * @return {IniSection}
     */
    static findClosestSection($item) {
        return $item.closest('.' + IniSection.cssClass).data(IniSection.cssClass);
    }

    get $element(){
        let $element = super.$element;
        $element.find(".sortable-values").sortable({
            connectWith: '.sortable-values'
        });
        return $element;
    }

    search(queryString) {
        let children = this.children;

        for (let child of children) {
            if (child.search(queryString)) {
                return true;
            }
        }
    }
};