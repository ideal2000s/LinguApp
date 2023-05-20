# frozen_string_literal: true

class ProfilesController < ApplicationController
  include UserControllerContext
  before_action :authenticate_user!
  before_action -> { current_user.validate }
  layout 'blank'

  def show
    render :show, locals: { user: current_user, teams: teams }
  end

  def update
    if current_user.update(profile_params)
      current_team.update(name: params[:team_name]) if params[:team_name]
      # redirect_back(fallback_location: profile_path)
      redirect_to root_path
    else
      flash.now[:alert] = 'Something went wrong'
      update_error_render
    end
  end

  def incomplete
    render 'school/shared/onboarding', locals: { user: current_user, team: current_team, profile_check: true }
  end

  private

  def update_error_render
    if params[:profile_check]
      incomplete
    else
      render :show, locals: { user: current_user }
    end
  end

  # override helper - used for teams only
  def policy(record)
    super([:teach, record])
  end

  def profile_params
    params.require(:profile).permit(
      :fname, :lname, :email, :about, :locale, :mobile, :avatar, :language_scope
    )
  end

  def password_params
    params.require(:profile).permit(
      :password, :password_confirmation, :current_password
    )
  end

  def teams
    current_user.actual_team_users
  end
end
