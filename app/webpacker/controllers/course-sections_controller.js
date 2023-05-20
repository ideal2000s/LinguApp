import BaseMoveController from './base_move_controller';
import axios from 'axios';
import $ from 'jquery';

export default class extends BaseMoveController {
  static targets = ['course_section'];
  downActionID = 'course-sections#down';
  upActionID = 'course-sections#up';
  targetElementID = 'course-sections.course_section';

  connect() {
    this.checkCourseSectionMoveAvailability();
  }

  checkCourseSectionMoveAvailability() {
    let controller = this;
    $(".course_sections_container .card[data-target='course-sections.course_section']").each(function(row) {
        if ($(this).prev().length === 0)
          $(this).find('a[data-action="' + controller.upActionID + '"]').css({'opacity': 0.6, 'pointer-events': 'none'});
        if ($(this).next().length === 0)
          $(this).find('a[data-action="' + controller.downActionID + '"]').css({'opacity': 0.6, 'pointer-events': 'none'});
      }
    );
  }

  swapRows(first, second, sendRequest = true) {
    this.swapInProgress = true;
    first.classList.add('moving-down');
    second.classList.add('moving-up');

    let swapTimeout = setTimeout(() => {
      this.clearMovingRowsClass(first, second);
      if (second.previousSibling === first) second.parentNode.insertBefore(second, first);
      swapTimeout = null;
      this.resetMovingLinkCss(first, second);
      this.disableMovingToOtherSection(first, second);
    }, 300);

    if (!sendRequest) {
      this.swapInProgress = false;
      return;
    }

    const path = second.dataset.moveUpPath;
    axios
      .patch(path, {})
      .then(() => (this.swapInProgress = false))
      .catch(() => {
        if (swapTimeout) setTimeout(() => this.swapRows(second, first, false), 300);
        else this.swapRows(second, first, false);
      });
  }

  up(event) {
    if (this.swapInProgress) return;
    const currentRow = event.target.closest('[data-target="' + this.targetElementID + '"]');
    const upperRow = currentRow.previousSibling;
    if (upperRow != null) {
      this.swapRows(upperRow, currentRow);
    }
  }

  down(event) {
    if (this.swapInProgress) return;
    const currentRow = event.target.closest('[data-target="' + this.targetElementID + '"]');
    const lowerRow = currentRow.nextSibling;
    if (lowerRow != null) {
      this.swapRows(currentRow, lowerRow);
    }
  }

  updateGame(currentRow, path, state) {
    axios.patch(path, { lesson_game: { enabled: state } }).then(() => {
      let disableBtn = $(currentRow).find('[data-action="games#deactivate"]');
      let enableBtn = $(currentRow).find('[data-action="games#activate"]');
      if(state) {
        disableBtn.removeClass('hidden');
        enableBtn.addClass('hidden');
        $(currentRow).removeClass('bg-soft-dark');
      } else {
        disableBtn.addClass('hidden');
        enableBtn.removeClass('hidden');
        $(currentRow).addClass('bg-soft-dark');
      }
    });
  }
}