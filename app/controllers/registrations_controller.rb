# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, if: :devise_controller?
  layout :resolve_layout

  def create
    super

    create_team_invitations
  end

  def resolve_layout
    case action_name
    when /new|create/
      'auth/index'
    else
      'admin/workspace'
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[fname lname])
  end

  def create_team_invitations
    return unless resource.persisted?

    Auth::Cases::CreateTeamInvitations.call(user: resource)
  end
end
