const IniSection = require('./IniSection');
const IniComment = require('./IniComment');
const IniValue = require('./IniValue');

module.exports = class {
    static getElement(line, allSettings) {
        if (line.match(IniSection.regex)) {
            return IniSection.parse(line, allSettings);
        }
        // if we are parsing a comment
        // and option convertCommentsToSections is enabled,
        // and the line does not contain a = (which would indicate that it really is just a commented-out line),
        // make it a section
        if (line.match(IniComment.regex) && allSettings.loadSave.joomla.convertCommentsToSections && line.indexOf('=') == -1) {
            return IniSection.parse(line, allSettings, IniComment.regex);
        }
        if (line.match(IniComment.regex)) {
            return IniComment.parse(line, allSettings);
        }
        if (line.match(IniValue.regex)) {
            return IniValue.parse(line, allSettings);
        }
    }
};
