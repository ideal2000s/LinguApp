# frozen_string_literal: true

class InvitationMailer < ApplicationMailer
  def send_invitation_by_email(current_team:, invitee_email:, team_group_id:, plan_id:)
    @email = invitee_email
    @team_group_id = team_group_id
    @plan_id = plan_id
    @team_global_id = current_team.to_gid_param
    mail(subject: I18n.t('school.team_students.invite_students.invitation_request'), to: @email)
  end
end
