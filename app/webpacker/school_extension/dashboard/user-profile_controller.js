import { Controller } from 'stimulus';
import $ from 'jquery';
import intlTelInput from "intl-tel-input";

export default class extends Controller {
  static targets = ['body', 'preview', 'mobile', 'language'];

  connect() {
    window.uppyUtils.initUploadInputs($(this.bodyTarget));
    this.setLanguageSelect();
    this.setIntlTelInput();
  }

  formatCountry(country) {
    let country_info = country.text.split(', ');
    if(!country.id) { return '' }
    return $(
      `<img src=${country_info[0]} class="dropdown-item-flag"  alt="flag"/>` +
      `<span class="flag-text ml-2">${country_info[1]}</span>`
    );
  }

  setLanguageSelect() {
    let controller = this;
    $(this.languageTarget).select2({
      theme: 'bootstrap4',
      dropdownParent: $(controller.bodyTarget),
      templateResult: controller.formatCountry,
      templateSelection: controller.formatCountry,
      minimumResultsForSearch: -1
    })

  }

  setIntlTelInput() {
    const countryCode = $(this.mobileTarget).data("code");
    intlTelInput(this.mobileTarget, {
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.2/js/utils.js',
      separateDialCode: true,
      hiddenInput: 'mobile',
      initialCountry: countryCode || 'no',
      preferredCountries: ['no', 'us', 'gb']
    });
  }
}
