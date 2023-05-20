# frozen_string_literal: true

module School
  class CurrentTeamsController < ApplicationController
    def create
      team = current_user.teams.find_by(id: params[:id])
      Teams::Cases::SetDefault.call(team: team, user: current_user)
      session[:current_team_id] = team&.id
      redirect_to root_path
    end

    def edit
      authorize_action(current_team)
      render :edit, locals: { team: current_team, country_by_ip: country_by_ip }
    end

    def update
      authorize_action(current_team)
      if current_team.update(team_params)
        render :form_submit
      else
        render :edit, locals: { team: current_team, country_by_ip: country_by_ip }
      end
    end

    private

    def authorize_action(record = Team)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::TeamPolicy
    end

    def team_params
      params.permit(:name, :default_language_id, :image, :remove_image, :business_registration_id,
                    :country, :state, :city, :street_address, :postal_code,
                    :privacy_url, :gdpr_contact_name, :destroy_user_data_after, :lingutest_enabled)
    end

    def country_by_ip
      Geocoder.search(request.remote_ip).first&.country
    end
  end
end
