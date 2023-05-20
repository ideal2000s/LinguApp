import $ from 'jquery';

$(document).on('click', '.item-record-btn', function () {
  $(this).next().hide();
  $(this).hide().prev().show();
});