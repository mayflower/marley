const $ = require('jquery');

/**
 * @class
 * @property {jQuery} _$element
 */
module.exports = class IniElement {
    constructor() {
    }

    /**
     * @param {string} line
     * @param {Object} allSettings
     * @return {IniElement}
     */
    static parse(line, allSettings){
        let matches = line.match(this.regex);
        matches.shift();
        matches = matches.map((match) => this.unescape(match, allSettings));
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
     * @param {Object} allSettings
     *
     * @return string
     */
    static unescape(string, allSettings){
        let ret = string;
        // replace the joomla-string "_QQ_" with ".
        // as we had a bug that introduced strings like "_QQ_"_QQ_", those will also be shortened to ".
        if (allSettings.loadSave.joomla.escapeQuotes) {
            ret = ret.replace(/"(_QQ_")+/g, '"')
        }
        ret = ret.replace(/\\n/g, "\n"); // \n to real newline

        return ret;
    }

    /**
     * converts normal string to escaped string for ini
     * @param string
     * @param allSettings
     */
    static escape(string, allSettings){
        let ret = string;

        // joomla-specific: " to "_QQ_"
        if (allSettings.loadSave.joomla.escapeQuotes) {
            ret = ret.replace(/"/g, '"_QQ_"');
        }
        ret = ret.replace(/\n/g, '\\n'); // newline to \n

        return ret;
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
     * @param {Object} allSettings
     * @returns {string}
     */
    toIni(allSettings) {
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
