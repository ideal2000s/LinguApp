# frozen_string_literal: true

module Teach
  class TeamUsersController < ApplicationController
    layout 'application'
    before_action :authenticate_action, only: %i[update destroy]

    def index
      authorize(team, :show?)
      render 'index', locals: { team: team, team_users: team_users }
    end

    def update
      team_user.update!(update_params)

      render 'update', locals: { team: team, team_users: team_users }
    end

    def destroy
      Teams::Cases::Leave.call(team: team, user: current_user)

      render 'update', locals: { team: team, team_users: team_users }
    end

    def leave
      Teams::Cases::Leave.call(team: team, user: current_user)

      redirect_to profile_path
    end

    private

    def authenticate_action(record = team_user)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def team
      team_scope.find(params[:team_id])
    end

    def team_user
      scope.find(params[:id])
    end

    def pundit_user
      current_user
    end

    def team_users
      scope.by_user_name
    end

    def scope
      policy_scope(team.team_users, policy_scope_class: Teach::TeamUserPolicy::Scope)
    end

    def team_scope
      policy_scope(current_user.teams, policy_scope_class: Teach::TeamPolicy::Scope)
    end

    def policy_class
      Teach::TeamUserPolicy
    end

    def update_params
      params.permit(:role)
    end
  end
end
