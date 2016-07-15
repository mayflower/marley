$(document).on('click', '.toggle-collapse', function () {
    let $thisButton = $(this);
    let $panelHeading = $thisButton.parent('.panel-heading');
    let $panelBody = $panelHeading.next('.panel-body');

    $panelBody.toggle(function () {
        let $glyphicon = $thisButton.children('i');
        
        if ($glyphicon.hasClass('glyphicon-chevron-up')) {
            $glyphicon.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $glyphicon.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });
});
