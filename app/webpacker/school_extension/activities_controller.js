import { Controller } from 'stimulus';
import $ from 'jquery';

export default class extends Controller {
  connect() {
    this.initializeFilter();
  }

  initializeFilter() {
    const searchParams = new URLSearchParams(window.location.search);
    const key_params = searchParams.get('q[key_include]');
    const recipient_params = searchParams.get('q[recipient_of_User_type_include]');
    if (key_params) {
      $('.clear-filter').css('opacity', '1');
      key_params.split(',').forEach(e => {
        $('.event-by-filter input[type="checkbox"]').each(function () {
          if ($(this).data('filter-val') == e) {
            $(this).prop('checked', true);
          }
        });
      });
    }
    if (recipient_params) {
      recipient_params.split(',').forEach(e => {
        $('.recipient-by-filter input[type="checkbox"]').each(function () {
          if ($(this).data('filter-val') == e) {
            $(this).prop('checked', true);
          }
        });
      });
    }
  }
}