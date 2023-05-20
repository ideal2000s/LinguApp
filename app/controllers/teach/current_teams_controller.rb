# frozen_string_literal: true

module Teach
  class CurrentTeamsController < ApplicationController
    def create
      team = current_user.teams.find_by(id: params[:id])
      session[:current_team_id] = team&.id

      redirect_to root_path if redirect_onboarding(team).nil?
    end
  end
end
