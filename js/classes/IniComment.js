const IniElement = require('./IniElement');
const $ = require('jquery');

/**
 * @class {IniComment}
 * @property {string} comment
 */
module.exports = class IniComment extends IniElement {
    constructor(comment){
        super();
        this.comment = comment;
    }

    static get regex() {
        return /^;(.*)/;
    }

    /**
     *
     * @param allSettings
     * @return {string}
     */
    toIni(allSettings) {
        return `;${this.constructor.escape(this.comment, allSettings)}`;
    }

    render() {
        let $element = $(`
        <li class="ini-comment clearfix">
        <div class="pointer"><i class="fa fa-arrows" aria-hidden="true"></i></div>
        <div class="row">
            <div class="col-sm-3 comment">
                <em>(Kommentar)</em>
            </div>
            <div class="col-sm-9 flex-col">
                <textarea class="form-control name" rows="1">${this.comment}</textarea>
                <button type="button" class="btn btn-default remove-value"><i class="glyphicon glyphicon-minus"></i></button>
            </div>
        </div></li>`);

        let $name = $element.find('.name');
        $name.change(()=> {
            this.comment = $name.val();
        });

        return $element;
    }

    getContent() {
        return this.comment;
    }
};
