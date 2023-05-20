import $ from 'jquery';

$(document).on('change', '.active-lang-checkbox', function () {
  const status = $(this).prop('checked');
  $('.active-lang-checkbox').prop({ checked: false, disabled: status });
  $(this).prop({ checked: status, disabled: false });
});
