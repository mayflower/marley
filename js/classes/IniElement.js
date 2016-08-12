const $ = require('jquery');

/**
 * @class
 * @property {jQuery} _$element
 */
module.exports = class IniElement {
    constructor() {
    }

    static parse(line){
        let matches = line.match(this.regex);
        matches.shift();
        let implementingClass = this;

        return new implementingClass(...matches);
    }

    get $element() {
        if (!this._$element) {
            this._$element = this.render();
            this._$element.addClass(IniElement.cssClass).data(IniElement.cssClass, this);
            this._$element.addClass(this.constructor.cssClass).data(this.constructor.cssClass, this);
        }
        return this._$element;
    }

    /**
     * converts escaped ini-string to normal string for display
     * @param string
     */
    unescape(string){
        return string.replace(/"_QQ_"/g, '"').replace(/\\n/g, "\n");
    }

    /**
     * converts normal string to escaped string for ini
     * @param string
     */
    escape(string){
        return string.replace(/"/g, '"_QQ_"').replace(/\n/g, '\\n');
    }

    static get cssClass() {
        return 'has-ini-element';
    }

    /**
     * @param {jQuery} $items
     * @return {IniElement[]}
     */
    static findElements($items) {
        return $items.find('.'+IniElement.cssClass).toArray().map((item) => $(item).data(IniElement.cssClass));
    }

    /**
     * @param {jQuery} $item
     * @return {IniElement}
     */
    static getElement($item) {
        return $item.data(IniElement.cssClass);
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

    /**
     * @returns {string}
     */
    getContent() {
        throw "implement me!";
    }

    /**
     * Check if the element contains a certain string. Returns true if it does otherwise false.
     * @param queryString
     * @returns {boolean}
     */
    search(queryString) {
        let searchContent = this.getContent();

        searchContent = searchContent.toLowerCase();

        return searchContent.indexOf(queryString) !== -1;
    }
};
