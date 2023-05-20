# frozen_string_literal: true

class TeamInvitationsController < ApplicationController
  include UserControllerContext
  before_action :store_location
  before_action :authenticate_user!

  def show
    member = team&.users&.include?(current_user)
    render 'show', locals: { team: team, member: member }, layout: 'blank'
  end

  def create
    result = Teams::Flows::Join.call(team: team, user: current_user, params: create_params, user_params: user_update_params)

    if result.success?
      redirect_to school_dashboard_path, notice: t('.joined', team: team.name)
    else
      redirect_to :back, error: t('.failure')
    end
  end

  private

  def team
    @team = GlobalID::Locator.locate(params[:team_id])
    flash[:alert] = t('.team_not_found') unless @team
    raise ActiveRecord::RecordNotFound if @team&.discarded?

    @team
  end

  def create_params
    params.permit(:default)
  end

  def user_update_params
    params.require(:user).permit(:fname, :lname)
  end

  def store_location
    store_location_for(:user, request.fullpath)
  end
end
