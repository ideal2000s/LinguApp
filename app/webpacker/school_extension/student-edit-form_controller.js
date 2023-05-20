import { Controller } from 'stimulus';
import 'js-autocomplete/auto-complete.css';
import autocomplete from 'js-autocomplete';
import $ from "jquery";

export default class extends Controller {
  static targets = ['studentLanguageSelect'];

  connect() {
    this.initializeAutoCompleteLanguage();
  }

  initializeAutoCompleteLanguage() {
    let languages;
    const url = this.studentLanguageSelectTarget.dataset.url;
    const select_url = this.studentLanguageSelectTarget.dataset.select_url;
    const scope = this.studentLanguageSelectTarget.dataset.language_scope;
    const existingLanguageIds = $(`.student-${scope}-language-item`).map(function () {
      return this.dataset.language_id
    }).get();

    $.ajax({
      url: url + `?language_ids=${existingLanguageIds}&scope=${scope}`,
      dataType: 'json',
      async: false,
      success: function(data) {
        languages = data.languages;
      },
      error: function() {
        console.log('failed');
      }
    })

    new autocomplete({
      selector: this.studentLanguageSelectTarget,
      minChars: 0,
      source: function (search_text, callback) {
        const countries = languages.map(obj => {
          return $.trim(obj[0].split(',')[1]);
        });
        const matches = [];
        for (let i = 0; i < languages.length; i++)
          if (countries[i].toLowerCase().startsWith($.trim(search_text.toLowerCase()))) matches.push(languages[i]);
        callback(matches);
      },
      onSelect: function(e) {
        let select_language_id = e.target.dataset.value.split(',')[2];
        let new_items_count = $(`.student-${scope}-language-item[data-new_record=true]`).length;
        $.ajax({
          url: select_url + `?language_id=${select_language_id}&new_items_count=${new_items_count}&scope=${scope}`,
          async: false,
          success: function() {
            console.log('success');
          },
          error: function() {
            console.log('failed');
          }
        })
      },
      renderItem: function (item) {
        const country_info = item[0].split(', ');
        let render_template = '<div class="autocomplete-suggestion" id="suggestion_' + country_info[1] + '" data-value="' + item + '">';
        render_template += '<img src="' + country_info[0] + '" class="dropdown-item-flag" alt="flag"/>';
        render_template += '<span class="flag-text ml-2" data-value="' + item + '">' + country_info[1] + '</span></div>';
        return render_template;
      }
    });
  }
}