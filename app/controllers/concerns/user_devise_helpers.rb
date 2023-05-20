# frozen_string_literal: true

module UserDeviseHelpers
  extend ActiveSupport::Concern

  included do
    layout :layout_by_resource
    before_action :set_sentry_context, :find_current_user, :find_current_team
    helper_method :current_team
    helper_method :current_user_teams
  end

  private

  def find_current_user
    User.current = current_user
  end

  def find_current_team
    Team.current = current_team
  end

  def current_team
    return false if current_user.blank?

    @current_team ||= current_user_teams.find_by(id: session[:current_team_id]) || current_user&.default_team
  end

  def current_user_teams
    current_user.teams.kept.ordered
  end

  def set_sentry_context
    Sentry.configure_scope do |scope|
      scope.set_user(id: current_user.id, type: 'User') if current_user
    end
  end

  def user_not_authorized
    Rails.logger << '========== Not authorized! ==========='
    flash[:alert] = I18n.t('authorization_error')
    redirect_to(request.referer || root_path)
  end

  def layout_by_resource
    if devise_controller?
      'auth/index'
    else
      'application'
    end
  end
end
