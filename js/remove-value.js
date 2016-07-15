const $ = require('jquery');

$(document).on('click', '.remove-value', function () {
    let $value = $(this).parents('li').first();

    $value.remove();

});


function testModal(text){
    let $modal = $('<div class="modal fade" role="dialog"></div>');
    let $modalDialog = $('<div class="modal-dialog"></div>').appendTo($modal);
    let $modalHeader = $('<div class="modal-header">').appendTo($modalDialog);
    let $modalBody = $('<div class="modal-body">').text(text).appendTo($modalDialog);
    let $modalFooter = $('<div class="modal-footer">').appendTo($modalDialog);

    $modal.on('hidden.bs.modal', ()=>{ $modal.remove(); } ).appendTo('body');
    $modal.modal();
}