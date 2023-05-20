# frozen_string_literal: true

module Admin
  class TeamsController < ApplicationController
    def index
      authorize_action
      @search = scope.ransack(params[:q])
      @search.sorts = 'created_at desc' if @search.sorts.empty?
      render :index, locals: { teams: @search.result.page(params[:page]) }
    end

    def show
      authorize_action(team)
      render :show, locals: { team: team, team_users: team.team_users.includes(:user) }
    end

    def new
      authorize_action
      team = Team.new
      render :new, locals: { team: team }
    end

    def create
      authorize_action
      team = Team.new(team_params)
      respond_to do |format|
        if team.save
          create_team_users(team)
          format.html { redirect_to admin_teams_path, notice: t('.created_team') }
        else
          format.html { render :new, locals: { team: team } }
        end
      end
    end

    def create_team_users(team)
      team.team_users.create(user_id: team.owner_id, role: :owner, default: true)
      team.team_users.create(user_id: current_user.id, role: :owner)
    end

    def edit
      authorize_action(team)
      render :edit, locals: { team: team }
    end

    def update
      authorize_action(team)
      if team.update(team_params)
        redirect_to admin_teams_path,
                    notice: "Team #{helpers.link_to(team.name, edit_admin_team_path(team))} was updated"
      else
        render :edit, locals: { team: team }, status: :unprocessable_entity
      end
    end

    def signin_school
      authorize_action(team)
      team.team_users.find_or_create_by!(user_id: current_user.id) do |team_user|
        team_user.role = :owner
      end
      redirect_to set_team_school_current_team_url(id: team.id, subdomain: :school)
    end

    private

    def team_params
      params.require(:team).permit(:name, :status, :owner_id, :image, :about, :default_language_id, abilities: [])
    end

    def team
      @team ||= scope.find(params[:id])
    end

    def authorize_action(record = Team)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::TeamPolicy
    end

    def scope
      policy_scope(Team, policy_scope_class: Admin::TeamPolicy::Scope)
    end
  end
end
