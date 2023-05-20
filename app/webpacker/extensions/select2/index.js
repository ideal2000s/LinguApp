import 'select2';
import $ from 'jquery';
import './select2.scss';

$(document).on('select2:select', '.usersearch', (e) => {
  document.location.href = e.params.data.url;
});

$(function () {
  $('select.select2').select2({ theme: 'bootstrap4' });

  select2Utils.initSearchSelect();

  const $userSearchEl = $('.select2-remote.usersearch');
  $userSearchEl.length && $userSearchEl.each((_i, element) => {
      $(element).select2({
        theme: 'bootstrap4',
        ajax: {
          url: '/search',
          dataType: 'json',
          delay: 100,
          data: ({ term, page = 1 }) => ({
            q: term,
            page: page,
          }),
          processResults: (data) => ({
            results: data.items
          }),
          cache: true,
        },
        minimumInputLength: 1,
      });
    });

  const inlineDropdownSelect = $('.inline-select');
  inlineDropdownSelect.select2({
    minimumResultsForSearch: -1,
  });
});

window.select2Utils = {
  initSearchSelect: function () {
    const $SearchEl = $('.select2-remote.words-search, .select2-remote.lessons-search');

    $SearchEl.length && $SearchEl.each((_i, element) => {
        $(element).select2({
          theme: 'bootstrap4',
          ajax: {
            url: element.dataset.url,
            dataType: 'json',
            delay: 100,
            data: ({term, page = 1}) => ({
              q: term,
              page: page,
            }),
            processResults: (data) => ({
              results: data.items
            }),
            cache: true,
          },
          minimumInputLength: element.dataset.inputlength || 2,
        });
      });
  }
};
