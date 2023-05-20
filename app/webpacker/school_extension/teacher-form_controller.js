import { Controller } from 'stimulus';
import $ from 'jquery';
import intlTelInput from "intl-tel-input";
import 'js-autocomplete/auto-complete.css';
import autocomplete from 'js-autocomplete';

export default class extends Controller {
  static targets = ['roleInput', 'userLanguagesSelect', 'userMobileSelect', 'autocompleteSuggestion', 'languageScope', 'isNewInput', 'hasUserLanguage'];

  connect() {
    this.setIntlTelInput();
    this.initializeAutoCompleteLanguage();
  }

  initializeAutoCompleteLanguage() {
    const languages = JSON.parse(this.userLanguagesSelectTarget.dataset.value);
    if ($(this.isNewInputTarget).val() == 'true' && $(this.hasUserLanguageTarget).val() == 'false') $('.language-suggestion').remove();
    new autocomplete({
      selector: this.userLanguagesSelectTarget,
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
      onSelect: function(event) {
        event.preventDefault();
        const item = event.target.dataset.value.split(',');
        const language_scope = $(this.languageScopeTarget).val();
        let is_selected = false;
        $("input[name*='user_languages[]']").each(function () {
          if ($(this).val() == item[2]) is_selected = true;
        });
        if (is_selected) return;
        let template = '<div class="d-flex align-items-baseline language-suggestion"><div class="language-select">';
        template += '<input type="hidden" name="user_languages[]" value="' + $.trim(item[2]) + '">';
        template += '<img src="' + $.trim(item[0]) + '" class="dropdown-item-flag" alt="flag"/>';
        template += '<span class="flag-text ml-3">' + $.trim(item[1]) + '</span></div>';
        template += '<div class="language-action">';
        let default_language_active = '';
        let set_language_active = '';
        if ((!Boolean(language_scope) && $(".language-suggestion").length < 1) || language_scope == $.trim(item[2])) {
          set_language_active = 'd-none';
        } else {
          default_language_active = 'd-none';
        }
        template += '<span class="default-language ' + default_language_active + '"><i class="mr-3 fas fa-check"></i>Default</span>';
        template += '<a class="set-language ml-3 mr-2 cursor-pointer text-right ' + set_language_active + '" data-value="' + $.trim(item[2]) + '" data-action="click->teacher-form#defaultLanguageSelected">Set as default</a>';
        template += '<i class="ml-2 cursor-pointer fas fa-times" data-action="click->teacher-form#languageSelectCanceled"></i>';
        template += '</div></div>';
        $(".selected-languages").append(template);
      },
      renderItem: function (item) {
        const country_info = item[0].split(',');
        let render_template = '<div class="autocomplete-suggestion" data-value="' + item + '">';
        render_template += '<img src="' + country_info[0] + '" class="dropdown-item-flag" alt="flag"/>';
        render_template += '<span class="flag-text ml-2" data-value="' + item + '">' + country_info[1] + '</span></div>';
        return render_template;
      }
    });
  }

  defaultLanguageSelected(event) {
    $('.default-language').addClass('d-none');
    $('.set-language').removeClass('d-none');
    $(event.target).addClass('d-none');
    $(event.target).prev().removeClass('d-none');
    $(this.languageScopeTarget).val(event.target.dataset.value);
  }

  languageSelectCanceled(event) {
    $(event.target).parents('.language-suggestion')[0].remove();
    $($('.language-suggestion')[0]).find('.default-language').removeClass('d-none');
    $($('.language-suggestion')[0]).find('.set-language').addClass('d-none');
  }

  roleChanged(event) {
    const role = event.target.dataset.value;
    $(this.roleInputTarget).val(role);
  }

  setIntlTelInput() {
    const countryCode = $(this.userMobileSelectTarget).data("code");
    intlTelInput(this.userMobileSelectTarget, {
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.2/js/utils.js',
      separateDialCode: true,
      hiddenInput: 'mobile',
      initialCountry: countryCode || 'no',
      preferredCountries: ['no', 'us', 'gb']
    });
  }
}
