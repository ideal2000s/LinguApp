import $ from 'jquery';

$(document).on('change', '#check_post_lesson', function () {
  $('#post_lesson_id').prop('disabled', !$('#check_post_lesson').prop('checked'));
});
