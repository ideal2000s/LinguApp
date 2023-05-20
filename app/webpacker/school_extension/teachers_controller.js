import { Controller } from 'stimulus';
import $ from 'jquery';

export default class extends Controller {
  static targets = ['clearFilter', 'selectedSortItem'];

  connect() {
    this.initializeFilter();
  }

  initializeFilter() {
    const searchParams = new URLSearchParams(window.location.search);
    const roles = searchParams.get('q[role_include]');
    const sort = searchParams.get('q[s]');
    if (sort) {
      $(".custom-filter-item").each(function () {
        if ($(this).data('filter-by') == sort) {
          $('.selected-sort-item').text($(this).find('button').text());
        }
      });
    }
    if (roles) {
      $('.clear-filter').css('opacity', '1');
      roles.split(',').forEach(e => {
        $('.roles-by-filter input[type="checkbox"]').each(function () {
          if ($(this).data('filter-val') == e) {
            $(this).prop('checked', true);
          }
        });
      });
    }
  }
}