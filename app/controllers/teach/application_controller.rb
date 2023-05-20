# frozen_string_literal: true

module Teach
  class ApplicationController < ::ApplicationController
    include UserControllerContext
    include IncompleteProfileChecker
    before_action :authenticate_user!
    before_action :redirect_onboarding
    layout 'teach/teach'

    def policy(record)
      super([:teach, record])
    end

    def pundit_user
      current_team_user
    end

    def current_team_user
      return if current_user.blank? || current_team.blank?

      @current_team_user ||= current_user.team_users.find_by(team_id: current_team.id)
    end
    helper_method :current_team_user

    def redirect_onboarding(team = current_team)
      return if team.abilities&.present?
      return unless current_team_user&.owner?

      redirect_to instruction_teach_team_path(team, refer: request.referer)
    end
  end
end
