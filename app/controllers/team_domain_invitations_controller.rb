# frozen_string_literal: true

class TeamDomainInvitationsController < ApplicationController
  def accept
    TeamInvitations::Flows::Accept.call(user: current_user, team_invitation: team_invitation)

    respond_to do |format|
      format.js do
        render :accept, locals: { user: current_user }
      end
    end
  end

  def decline
    team_invitation.declined!

    respond_to do |format|
      format.js do
        render :accept, locals: { user: current_user }
      end
    end
  end

  private

  def policy(record)
    super([:admin, record])
  end

  def team_invitation
    current_user.team_invitations.find(params[:team_domain_invitation_id])
  end
end
