import { Controller } from 'stimulus';
import $ from 'jquery';

export default class extends Controller {
  static targets = ['body', 'preview', 'selectLanguage', 'selectCountry', 'selectState', 'enableTestBtn', 'enabledTestCheck', 'enabledTest'];

  connect() {
    window.uppyUtils.initUploadInputs($(this.bodyTarget));
    this.initializeSelectLanguage();
    this.initializeSelectCountry();
    if (window.countryData['current_country'] == "" && window.countryData['by_ip'] != "") {
      $(this.selectCountryTarget).select2("val", [window.countryData['by_ip'], '']);
    }
    this.stateSelectRenderTemplate($(this.selectCountryTarget).val());
  }

  initializeSelectLanguage() {
    $(this.selectLanguageTarget).select2({
      theme: 'bootstrap4',
      dropdownParent: $('#school-main-modal .modal-content'),
      templateResult: this.formatLanaguage,
      templateSelection: this.formatLanaguage,
      minimumResultsForSearch: -1
    });
  }

  initializeSelectCountry() {
    $(this.selectCountryTarget).select2({
      theme: 'bootstrap4',
      dropdownParent: $('#school-main-modal .modal-content'),
      templateResult: this.formatCountry,
      templateSelection: this.formatCountry,
      minimumResultsForSearch: 1
    });
    $(this.selectCountryTarget).on("select2:select", function(e) {
      let country = window.countryData['countries'].filter(obj => obj[0] == e.target.value)[0];
      let template = "";
      country[1].forEach(function (state) {
        if (window.countryData['current_state'] == state[0]) {
          template += "<option value='" + state[0] + "' selected>" + state[1] + "</option>";
        } else {
          template += "<option value='" + state[0] + "'>" + state[1] + "</option>";
        }
      });
      $('.state-select').html(template);
    });
  }

  formatLanaguage(country) {
    const country_info = country.text.split(', ');
    if(!country.id) { return; }
    return $(
      `<img src=${country_info[0]} class="dropdown-item-flag"  alt="flag"/>` +
      `<span class="flag-text ml-2">${country_info[1]}</span>`
    );
  }

  formatCountry(country) {
    const country_info = country.text.split(', ');
    return $(
      `<span>${country_info[1]}</span>` +
      `<span class="flag-text ml-2">${country_info[0]}</span>`
    );
  }

  stateSelectRenderTemplate(country_text) {
    if (!country_text) { return; }
    let country = window.countryData['countries'].filter(obj => obj[0] == country_text)[0];
    let template = "";
    country[1].forEach(function (state) {
      if (window.countryData['current_state'] == state[0]) {
        template += "<option value='" + state[0] + "' selected>" + state[1] + "</option>";
      } else {
        template += "<option value='" + state[0] + "'>" + state[1] + "</option>";
      }
    });
    $('.state-select').html(template);
  }

  agreeTermsAndConditionsChanged(event) {
    $(this.enableTestBtnTarget).prop('disabled', !event.target.checked);
  }

  enabledTestChanged(event) {
    const state = (event.target.checked) ? event.target.dataset.on : event.target.dataset.off;
    $(this.enabledTestCheckTarget).text(state);
    $(this.enabledTestTarget).val(event.target.checked);
  }

  copySecretCode(event) {
    event.preventDefault();
    let copy_input = $(event.target).parents('.secret-form').find('.secret-field');
    $(copy_input).focus();
    $(copy_input).select();
    document.execCommand('copy');
  }
}