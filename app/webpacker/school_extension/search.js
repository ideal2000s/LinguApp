import Rails from '@rails/ujs';
import $ from 'jquery';

$(document).on('click', '.search-result-container li', function () {
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
});

$(document).on('input', '#search_lingu_school', function () {
  if ($(this).val().length > 0) $('.search-fallback').hide();
  else $('.search-fallback').show();
  Rails.fire(this.form, 'submit');
});
