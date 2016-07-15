const IniSection = require('./IniSection');
const IniComment = require('./IniComment');
const IniValue = require('./IniValue');

module.exports = class {
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
};
