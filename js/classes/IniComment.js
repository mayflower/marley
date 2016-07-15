const IniElement = require('./IniElement');
const $ = require('jquery');

module.exports = class IniComment extends IniElement {
    static get regex() {
        return /^;(.*)/;
    }

    toIni() {
        return `;${this.escape(this.name)}`;
    }

    render() {
        let $element = $(`
        <li class="ini-comment"><div class="row">
            <div class="col-sm-1">                
                <i class="fa fa-arrows" aria-hidden="true"></i>
            </div>
            <div class="col-sm-2">                
                (Kommentar)
            </div>
            <div class="col-sm-9 flex-col">
                <textarea class="form-control name" rows="1">${this.name}</textarea>
                <button type="button" class="btn btn-default remove-value"><i class="glyphicon glyphicon-minus"></i></button>
            </div>
        </div></li>`);

        let $name = $element.find('.name');
        $name.change(()=> {
            this.name = $name.val();
        });

        return $element;
    }
};
