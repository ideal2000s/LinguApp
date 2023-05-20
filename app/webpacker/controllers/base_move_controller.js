import { Controller } from 'stimulus';
import axios from 'axios';
import $ from 'jquery';

export default class extends Controller {
  swapInProgress = false;

  clearMovingRowsClass(...rows) {
    rows.forEach(row => this.clearMovingRowClass(row));
  }

  clearMovingRowClass(row) {
    row.classList.remove('moving-up');
    row.classList.remove('moving-down');
    row.classList.remove('moving-back');
  }

  resetMovingLinkCss(...elements) {
    elements.forEach(element => {
      $($(element).find('.btn-group')[0]).find('a').each(function (e) {
        $(this).css({'opacity': 1, 'pointer-events': 'visible'})
      })
    })
  }

  disableMovingToOtherSection(...elements) {
    elements.forEach(element => {
      if (element.nextSibling == null)
        $(element).find('[data-action="' + this.downActionID + '"]').css({'opacity': 0.6, 'pointer-events': 'none'})
      if (element.previousSibling == null)
        $(element).find('[data-action="' + this.upActionID + '"]').css({'opacity': 0.6, 'pointer-events': 'none'})
    })
  }
}