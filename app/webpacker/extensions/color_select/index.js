import $ from 'jquery';

$(document).on('click', '.lingu-color', function () {
  $(this).parent().closest('div').addClass('lingu-color-selected').siblings().removeClass('lingu-color-selected');
  $('#set_color_form').find('.frontend-color-input').val($(this).attr('color-name')).end().submit();
});