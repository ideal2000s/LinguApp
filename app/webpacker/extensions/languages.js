import $ from 'jquery';

function onCheckboxChange() {
  let phrase_ids = $('input[name="phrase_ids"]:checked').map(function () {
    return this.value;
  }).get();
  if(phrase_ids.length === 0)
    $('#dropdownMenuButton').addClass('disabled');
  else
    $('#dropdownMenuButton').removeClass('disabled');
  let url = new URL($('#btn_new_collection').attr('href'), location.origin);
  let destroy_url = new URL($('#btn_delete_phrase').attr('href'), location.origin);
  let remove_url = new URL($('#btn_remove_phrases').attr('href'), location.origin);
  let add_to_collection_url = new URL($('#add_to_collection_btn').attr('href'), location.origin);
  url.searchParams.set("word_ids", phrase_ids);
  destroy_url.searchParams.set("ids", phrase_ids);
  remove_url.searchParams.set("ids", phrase_ids);
  add_to_collection_url.searchParams.set("word_ids", phrase_ids);
  $('#btn_new_collection').attr('href', url.pathname + url.search);
  $('#btn_delete_phrase').attr('href', destroy_url.pathname + destroy_url.search);
  $('#btn_remove_phrases').attr('href', remove_url.pathname + remove_url.search);
  $('#add_to_collection_btn').attr('href', add_to_collection_url.pathname + add_to_collection_url.search);
}

window.searchByWordClass = function (wordClass) {
  $('.phrase-search-form').find('#q_word_class_eq').val(wordClass).end().submit();
};

window.searchPhrasesByAlphabetic = function (alphabetic) {
  $('.phrase-search-form').find('#q_body_alphabetic_start').val(alphabetic).end().submit();
};

window.searchCollectionsByAlphabetic = function (alphabetic) {
  $('.collection-search-form').find('#q_name_start').val(alphabetic).end().submit();
};

$(document).on('change', 'input[name="phrase_ids"]', function () {
  onCheckboxChange();
});

$(document).on('change', '#check_all_phrase', function () {
  $('input[name="phrase_ids"]').prop('checked', $(this).prop("checked"));
  onCheckboxChange();
});

$(document).on('click', 'a.js-search-word-class', function(e){
  e.preventDefault();
  searchByWordClass(this.dataset.wordclass)
  return false;
})

$(document).on('click', 'a.js-search-collection-letter', function(e){
  e.preventDefault();
  searchCollectionsByAlphabetic(this.dataset.letter)
  return false;
})

$(document).on('click', 'a.js-search-phrase-letter', function(e){
  e.preventDefault();
  searchPhrasesByAlphabetic(this.dataset.letter)
  return false;
})

$('select#word_id').on('change', function (){
  if($('select#word_id option').length > 0)
    $('#search_add_collection_word').removeClass('disabled');
});

const previewPhraseImage = function (event) {
  let output = $('#preview_image').get(0);
  let valid_image_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp', 'image/tiff', 'image/gif']
  if(event.target.files.length) {
    if (!valid_image_types.includes(event.target.files[0]['type'])) {
      $('.file-upload__file').hide();
      $('#upload_file_name').removeClass('hidden').html(event.target.files[0].name);
    } else {
      $('#preview_image').removeClass('hidden');
      $('.file-upload__file').hide();
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src)
      }
    }
  }
  else
    $('#preview_image').hide();
};

window.previewPhraseAnimation = function (event) {
  if(event.target.files.length) {
    $('#animation_file_name').html(event.target.files[0].name);
  }
};

$(document).on('change', '#phrase_audio_upload', function (e) {
  if(e.target.files.length) {
    $('.custom-file-name').html(e.target.files[0].name);
    $('.file-upload__file a').hide();
  }
});

window.uploadCSVFile = function (event) {
  if(event.target.files.length) {
    event.target.form.submit();
  }
};

$(document).on('change', '.js-word-import-csv', uploadCSVFile);
$(document).on('change', '.js-submit-on-change', (e) => e.target.form.submit());
$(document).on('change,', '.js-preview-phrase-image', previewPhraseImage);
$(document).on('change,', '.js-preview-phrase-animation', previewPhraseAnimation);

$('#words_csv_export').on('click', function(e) {
  const query = $('.phrase-search-form').serialize();
  const csv_export_url = $(this).attr('data-url') + '?' + query;
  $(this).attr('href', csv_export_url);
});

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

$(document).on('click', '#word_illustration_choose', function (e) {
  $(this).hide();
  $(this).parent().find('.word_illustration').removeClass('hidden');
})

$('.modal').on('keypress', function (e) {
  if (e.target.nodeName === 'TRIX-EDITOR' || e.target.nodeName === 'TEXTAREA') return;
  const keycode = e.keyCode;
  if(keycode === 13) {
    e.preventDefault();
    $(this).find('input[type=submit]').click();
  }
})

$('#q_collections_id_not_null, #q_lessons_id_not_null').on('change', function () {
  const selected_value = $(this).val();
  $(this).prev().attr({'data-missing_audio': '', 'data-missing_illustration': ''});
  if (selected_value === 'missing_audio')
    $(this).prev().attr('data-missing_audio', true);
  if (selected_value === 'missing_illustration')
    $(this).prev().attr('data-missing_illustration', true);
  $('#q_with_empty_audio').val($('#collection_select_data').data('missing_audio') || $('#lesson_select_data').data('missing_audio'))
  $('#q_with_empty_image').val($('#collection_select_data').data('missing_illustration') || $('#lesson_select_data').data('missing_illustration'))
  $('.phrase-search-form').submit();
})

$(document).ready(function () {
  const searchParams = new URLSearchParams(window.location.search)
  const collection_select_val = searchParams.get('q[collections_id_not_null]');
  const lesson_select_val = searchParams.get('q[lessons_id_not_null]');
  $('#q_collections_id_not_null option').each(function () {
    if ($(this).attr('value') === collection_select_val) {
      if (collection_select_val !== '')
        $(this).closest('select').prev().attr(`data-${collection_select_val}`, true);
      $(this).attr('selected', true);
    }
  })
  $('#q_lessons_id_not_null option').each(function () {
    if ($(this).attr('value') === lesson_select_val) {
      if (lesson_select_val !== '')
        $(this).closest('select').prev().attr(`data-${lesson_select_val}`, true);
      $(this).attr('selected', true);
    }
  })
})
