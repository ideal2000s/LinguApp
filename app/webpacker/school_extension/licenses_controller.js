import { Controller } from 'stimulus';
import $ from 'jquery';

export default class extends Controller {
  static targets = ['licenseDropdown', 'planItem', 'activePlanInput'];

  licenseDropdownSelected(event) {
    event.stopPropagation();
  }

  planSelected(event) {
    let parent;
    if ($(event.target).hasClass('plan-panel')) {
      parent = event.target;
    } else {
      parent = $(event.target).parents('.plan-panel')[0];
    }
    $('.active_check').removeClass('active');
    $(parent).find('.active_check').addClass('active');
    $(this.activePlanInputTarget).val(parent.dataset.value);
  }
}