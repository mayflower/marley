const $ = require('jquery');

$(document).on('click', '.value-add', function () {
    let $addForm = $(this).parents('.add-value').first();

    let selectOpt = $addForm.find('.value-select').first().val();
    let value = $addForm.find('.value-text').first().val();

    console.log(selectOpt, value);
});
