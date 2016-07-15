/**
 * @class
 * @property {string} name
 */
module.exports = class IniElement {
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


}
