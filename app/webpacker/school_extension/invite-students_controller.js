import { Controller } from 'stimulus';
import $ from 'jquery';

export default class extends Controller {
  static targets = ['teamGroupSelect', 'copyLinkInput', 'inviteEmailInput', 'copyLinkBtn', 'moreInviteBtn', 'inviteLinkWrapper'];

  teamGroupChanged(event) {
    let invite_url = event.target.dataset.value;
    if ($(this.teamGroupSelectTarget).val() != '') {
      invite_url = [invite_url, '?team_group_id=', $(this.teamGroupSelectTarget).val()].join('');
    }
    $(this.copyLinkInputTarget).val(invite_url);
  }

  copyInvitationLink() {
    $(this.copyLinkInputTarget).focus();
    $(this.copyLinkInputTarget).select();
    document.execCommand('copy');
  }

  toggleJoinable(event) {
    let inviteLinkWrapper = $(this.inviteLinkWrapperTarget);
    $.ajax({
      url: $(event.target).data('url'),
      success: function (data) {
        if(data.joinable)
          inviteLinkWrapper.removeClass('d-none').addClass('d-flex');
        else
          inviteLinkWrapper.removeClass('d-flex').addClass('d-none');
      },
      error: function () {
        console.log('error');
      }
    });
  }

  addMoreInviteEmail() {
    $('.invite-email-input:last').after('<input id="invite_email_" class="form-control invite-email-input" type="text" name="invite_email[]" value="">');
  }
}
