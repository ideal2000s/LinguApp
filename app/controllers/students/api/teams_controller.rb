# frozen_string_literal: true

module Students::API
  class TeamsController < ApplicationController
    respond_to :json

    def show
      render :show, locals: { team: team }
    end

    def follow
      result = Teams::Cases::Follow.call(team: team, student: current_student)

      if result.success?
        head :ok
      else
        render json: { error: result.value }
      end
    end

    def unfollow
      result = Teams::Cases::Unfollow.call(team: team, student: current_student)

      if result.success?
        head :ok
      else
        render json: { error: result.value }
      end
    end

    private

    def team
      Team.find(params[:id])
    end
  end
end
