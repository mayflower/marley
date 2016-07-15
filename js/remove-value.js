const $ = require('jquery');

$(document).on('click', '.remove-value', function () {
    let $value = $(this).parents('li').first();

    $value.remove();

});
