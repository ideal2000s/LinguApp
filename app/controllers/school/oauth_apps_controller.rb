# frozen_string_literal: true

module School
  class OAuthAppsController < ApplicationController
    def create
      authorize_action
      school_oauth_apps_scope.create!(oauth_app_params)
      render :update, locals: { team: current_team }
    end

    def update
      authorize_action(oauth_app)
      oauth_app.update(oauth_app_params)
      render :update, locals: { team: current_team }
    end

    def destroy
      authorize_action(oauth_app)
      oauth_app.destroy!
      render :update, locals: { team: current_team }
    end

    def refresh_secret
      authorize_action(oauth_app)
      oauth_app.update(secret: oauth_app.secret_code)
      render :update, locals: { team: current_team }
    end

    private

    def oauth_app
      @oauth_app ||= school_oauth_apps_scope.find(params[:id])
    end

    def authorize_action(record = OAuth::App)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::OAuthAppPolicy
    end

    def school_oauth_apps_scope
      current_team.oauth_apps
    end

    def oauth_app_params
      params.permit(:name, :secret, redirect_uris: [])
    end
  end
end
