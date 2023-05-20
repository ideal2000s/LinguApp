# frozen_string_literal: true

module School
  class DashboardController < ApplicationController
    def index
      return if non_school_team

      authorize_action

      duration_stats = DurationGetter.call(team: current_team)
      team_presenter = TeamPresenter.new(current_team)
      render :index, locals: {
        current_team: current_team,
        team_presenter: team_presenter,
        duration_stats: duration_stats.value
      }
    end

    def agreement
      authorize_action
      url = school_gdpr_agreement_url(team: team.to_sgid, processor_name: params[:processor_name])
      team.update!(gdpr_contact_name: params[:processor_name])
      GdprConsenter.call(team: team, url: url) if request.format == 'text/html'
      respond_to do |format|
        format.html do
          redirect_back(fallback_location: school_dashboard_path, notice: t('school.dashboard.agreement_success'))
        end
      end
    end

    private

    def team
      @team = Team.find(params[:team_id])
    end

    def non_school_team
      return if current_team&.school?

      render 'school/shared/onboarding', layout: 'blank', locals: {
        team: current_team, school_teams: user_school_teams, profile_check: false
      }
    end

    def user_school_teams
      @user_school_teams ||= current_user_teams.school
    end

    def authorize_action(record = nil)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::DashboardPolicy
    end
  end
end
