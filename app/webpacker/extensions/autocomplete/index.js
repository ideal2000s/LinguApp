import 'js-autocomplete/auto-complete.css';
import autocomplete from 'js-autocomplete';
import $ from 'jquery';

const autocompleteSearch = function() {
  if (document.getElementById('glossary__form') && document.getElementById('lesson_phrase')) {
    const url = document.getElementById('glossary__form').dataset.url;
    let phrases;

    $.ajax({
      url: url,
      dataType: 'json',
      async: false,
      success: function(data) {
        phrases = data.phrases;
      },
      error: function(data) {
        console.log('failed');
      }
    });
    const searchInput = document.getElementById('lesson_phrase');

    if (phrases && searchInput) {
      new autocomplete({
        selector: searchInput,
        minChars: 1,
        source: function (term, suggest) {
          term = term.toLowerCase();
          const choices = phrases.map(e => {
            return e[0];
          });
          const word_classes = phrases.map(e => {
            return e[1];
          });
          const matches = [];
          for (let i = 0; i < choices.length; i++)
            if (choices[i].toLowerCase().startsWith(term)) matches.push(choices[i] + ` (${word_classes[i]})`);
          suggest(matches);
        },
        renderItem: function (item) {
          return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item + '</div>';
        }
      });
    }
  }
};

export { autocompleteSearch };
