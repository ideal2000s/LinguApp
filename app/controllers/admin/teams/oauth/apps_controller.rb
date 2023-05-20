# frozen_string_literal: true

module Admin
  module Teams
    module OAuth
      class AppsController < ApplicationController
        def index
          render :index, locals: { oauth_apps: oauth_apps }
        end

        def create
          app = oauth_apps.new(student_params)
          if app.save
            render :create, locals: { auth_application: app }
          else
            render :create_failed, locals: { oauth_app: app }
          end
        end

        def show; end

        def update; end

        def destroy; end

        def regenerate_key; end

        private

        def team
          @team ||= Team.find(params[:team_id])
        end

        def oauth_apps
          team.oauth_apps
        end
      end
    end
  end
end
