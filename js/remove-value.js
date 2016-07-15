const $ = require('jquery');

$(document).on('click', '.remove-value', function () {
    let $value = $(this).parents('li').first();

    let isConfirmed = confirm('Wollen Sie diesen Eintrag wirklich löschen?');
    if (isConfirmed) {
        $value.remove();
    }
});
