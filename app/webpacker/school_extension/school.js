import intlTelInput from 'intl-tel-input';
import Rails from '@rails/ujs';
import $ from "jquery";

const $filterContainers = $('.students-filter, .lessons-filter, .assignments-filter, .school-assignments-filter, .team-groups-filter');

$('.custom-dropdown').on('show.bs.dropdown', function () {
  $(this).find('i').addClass('caretup');
})

$('.custom-dropdown').on('hide.bs.dropdown', function () {
  $(this).find('i').removeClass('caretup');
})

$filterContainers.on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
})

$filterContainers.on('change', 'input[type="checkbox"]', function (e) {
  const $parent = $(this).closest('.dropdown-menu')
  const checked_count = $parent.find('input[type="checkbox"]:checked').length
  if(checked_count > 0) {
    $parent.find('.clear-filter').css('opacity', '1')
  } else {
    $parent.find('.clear-filter').css('opacity', '0.3')
  }
})

$filterContainers.on('click', '.clear-filter', function (e) {
  $(this).css('opacity', '0.3').closest('.dropdown-menu').find('input[type="checkbox"]').prop('checked', false);
})

$filterContainers.on('click', '.save-filter', function (e) {
  const filter_values = $(this).closest('.dropdown-menu').find('input[type="checkbox"]:checked').map(function () {
    return $(this).data('filter-val');
  }).get();
  $(this).closest('.custom-dropdown').find('.filter-values').val(filter_values);
})

$(document).ready(function () {
  const searchParams = new URLSearchParams(window.location.search)
  const language_ids = searchParams.get('q[active_target_language_include]') || searchParams.get('q[language_include]')
      || searchParams.get('q[student_language_include]') || searchParams.get('q[language_id_in]');
  if(language_ids) {
    const LanguagefilterContainer = $('.students-filter, .lessons-filter, .school-assignments-filter, .team-groups-filter');
    LanguagefilterContainer.find('.language-by-filter .clear-filter').css('opacity', '1');
    language_ids.split(',').forEach(e => {
      LanguagefilterContainer.find('.language-by-filter input[type="checkbox"]').each(function () {
        if($(this).data('filter-val') === parseInt(e, 10)) $(this).prop('checked', true);
      })
    });
  }

  const levels = searchParams.get('q[level_include]') || searchParams.get('q[student_level_include]') || searchParams.get('q[level_in]');
  if(levels) {
    const filterContainer = $('.students-filter, .lessons-filter, .team-groups-filter');
    filterContainer.find('.level-by-filter .clear-filter').css('opacity', '1');
    levels.split(',').forEach(e => {
      filterContainer.find('.level-by-filter input[type="checkbox"]').each(function () {
        if($(this).data('filter-val') === e) $(this).prop('checked', true);
      })
    });
  }

  const licenses = searchParams.get('q[active_license_include]');
  if(licenses) {
    $('.students-filter').find('.plan-by-filter .clear-filter').css('opacity', '1');
    licenses.split(',').forEach(e => {
      $('.students-filter').find('.plan-by-filter input[type="checkbox"]').each(function () {
        if($(this).data('filter-val') === parseInt(e)) $(this).prop('checked', true);
      })
    });
  }

  const statuses = searchParams.get('q[status_include]');
  if(statuses) {
    $('.assignments-filter').find('.status-by-filter .clear-filter').css('opacity', '1');
    statuses.split(',').forEach(e => {
      $('.assignments-filter').find('.status-by-filter input[type="checkbox"]').each(function () {
        if($(this).data('filter-val') === e) $(this).prop('checked', true);
      })
    });
  }

  const types = searchParams.get('q[types_include]');
  if(types) {
    const typeFilterContainer = $('.assignments-filter, .school-assignments-filter');
    typeFilterContainer.find('.type-by-filter .clear-filter').css('opacity', '1');
    types.split(',').forEach(e => {
      typeFilterContainer.find('.type-by-filter input[type="checkbox"]').each(function () {
        if($(this).data('filter-val') === e) $(this).prop('checked', true);
      })
    });
  }

  const authors = searchParams.get('q[author_id_in]');
  if(authors) {
    $('.students-filter').find('.created-by-filter .clear-filter').css('opacity', '1');
    authors.split(',').forEach(e => {
      $('.students-filter').find('.created-by-filter input[type="checkbox"]').each(function () {
        if($(this).data('filter-val') === parseInt(e)) $(this).prop('checked', true);
      })
    });
  }

  const sort_params = searchParams.get('q[s]');
  if(sort_params) {
    $('.school-info-sort .custom-filter-item').each(function (e) {
      $(this).removeClass('filter-item-active');
      if (sort_params.includes($(this).data('filter-by'))) {
        $(this).addClass('filter-item-active');
        $('.selected-sort-item').text($(this).text());
      }
    })
  }
})

window.setIntlTelInput = function () {
  const input = $("#mobile_number_input_new, #mobile_number_input_edit");
  const countryCode = input.data("code");
  input.each((_i, element) => {
    intlTelInput(element, {
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.2/js/utils.js',
      separateDialCode: true,
      hiddenInput: 'mobile',
      initialCountry: countryCode || 'no',
      preferredCountries: ['no', 'us', 'gb']
    });
  })
}

$(document).on('change', '#assign-lesson-modal input[type="checkbox"]', function () {
  if ($(this).prop('checked'))
    $(this).closest('.search-lessons-item').addClass('active');
  else
    $(this).closest('.search-lessons-item').removeClass('active');
  const checked_lesson_count = $('#assign-lesson-modal input[type="checkbox"]:checked').length
  if (checked_lesson_count > 0)
    $('#assign-lesson-modal #clear_btn').show();
  else
    $('#assign-lesson-modal #clear_btn').hide();
});

$(document).on('click', '#assign-lesson-modal #clear_btn', function () {
  $(this).hide();
  $('#assign-lesson-modal input[type="checkbox"]').prop('checked', false);
  $('#assign-lesson-modal .search-lessons-item').removeClass('active');
})

$(document).on('input', '#search_lesson_input', function () {
  Rails.fire(this.form, 'submit');
})

$(document).on('click', '#assign-lesson-modal #assign_student_lessons', function () {
  const lesson_ids = $('#assign-lesson-modal input[type="checkbox"]:checked').map(function () {
    return $(this).data('lesson-id');
  }).get();
  $(this).closest('form').find('#lesson_ids').val(lesson_ids);
})

$(document).on('click', '#gdpr_show_btn', function () {
  $('#gdpr-notification-modal').modal('hide');
  $('#gdpr-agreement-modal').modal('show');
})

window.updateModalBackdrop = function($modal) {
  $modal.data('bs.modal')._config.backdrop = $modal.find("form").serialize() != $modal.data('default-content') ? 'static' : true;
}

$(document).on('change', '#new-student-modal :input', function () {
  updateModalBackdrop($(this).closest('.modal'));
})

$('#new-student-modal').on('hide.bs.modal', function () {
  if ($("#new-student-modal form").serialize() != $("#new-student-modal").data('default-content')) {
    return confirm($(this).data('confirm-close'));
  }
})
