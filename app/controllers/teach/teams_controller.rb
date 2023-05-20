# frozen_string_literal: true

module Teach
  class TeamsController < ApplicationController
    layout :by_action

    before_action :authorize_action, except: %i[new create instruction instruction_post]
    before_action :authorize_empty_action, only: %i[new create instruction instruction_post]
    skip_before_action :redirect_onboarding, only: %i[instruction instruction_post]

    def new
      respond_to do |format|
        format.js do
          render 'new', locals: { team: Team.new }
        end
      end
    end

    def create
      result = Teams::Cases::Create.call(user: current_user, params: team_params)

      if result.success?
        redirect_onboarding(result.value[:team])
      else
        render 'new', locals: { team: result.value[:team] }
      end
    end

    def edit
      respond_to do |format|
        format.js do
          render 'edit', locals: { team: team }
        end
      end
    end

    def update
      if team.update(team_params)
        render 'index', locals: { teams: teams }
      else
        render 'edit', locals: { team: team }
      end
    end

    def destroy
      Teams::Flows::Delete.call(team: team, user: current_user)

      render 'index', locals: { teams: teams }
    end

    def default
      Teams::Cases::SetDefault.call(team: team, user: current_user)

      render 'index', locals: { teams: teams }
    end

    def followers
      render :followers, locals: { followers: team.followers.order(created_at: :desc) }
    end

    def instruction
      respond_to do |format|
        format.js { render js: "window.location.href='#{instruction_teach_team_path(team, refer: params[:refer])}'" }
        format.html { render :instruction, locals: { team: team, refer: params[:refer] } }
      end
    end

    def instruction_post
      if team.update(instruction_params)
        redirect_to params[:refer].presence || teach_lessons_path
      else
        render :instruction
      end
    end

    private

    def by_action
      return 'admin/empty' if action_name == 'instruction'

      'teach/teach'
    end

    def authorize_action(record = team)
      authorize(record, "#{action_name}?")
    end

    def authorize_empty_action
      authorize(Team, "#{action_name}?")
    end

    def team_params
      params.require(:team).permit(:name, :image, :about, abilities: [])
    end

    def instruction_params
      params.require(:team).permit(abilities: [])
    end

    def team
      scope.find(params[:id])
    end

    def pundit_user
      current_user
    end

    def scope
      current_user.teams
    end

    def teams
      current_user.actual_team_users
    end
  end
end
