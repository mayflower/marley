const IniElement = require('./IniElement');
const $ = require('jquery');

/**
 * @class
 * @property {string} value
 */
module.exports =  class IniValue extends IniElement {
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
            <div class="col-sm-9 value-col">
                <textarea class="form-control value" rows="1">${this.value}</textarea>
                <button type="button" class="btn btn-default remove-value"><i class="glyphicon glyphicon-minus"></i></button>
            </div>
        </div></li>`);

        let $value = $element.find('.value');
        $value.change(() => {
            this.value = $value.val();
        });

        return $element;
    }
};
