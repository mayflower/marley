const IniSection = require('./IniSection');
const IniComment = require('./IniComment');
const IniValue = require('./IniValue');

module.exports = class {
    static getElement(line, allSettings) {
        if (line.match(IniSection.regex)) {
            return IniSection.parse(line, allSettings);
        }
        if (line.match(IniComment.regex)) {
            return IniComment.parse(line, allSettings);
        }
        if (line.match(IniValue.regex)) {
            return IniValue.parse(line, allSettings);
        }
    }
};
