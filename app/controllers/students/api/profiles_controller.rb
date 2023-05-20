# frozen_string_literal: true

module Students::API
  class ProfilesController < ApplicationController
    before_action :authenticate_student!

    respond_to :json

    def show
      render_profile
    end

    def update
      return render_profile if current_student.update!(update_params)

      render json: { errors: current_student.errors.full_messages }, status: :unprocessable_entity
    end

    def destroy
      current_student.discard!
      sign_out
      head :no_content
    end

    private

    def render_profile
      render :show, locals: { student: current_student }
    end

    def update_params
      params
        .require(:student)
        .permit(:fname, :lname, :native_student_support_language_id, :active_student_target_language_id, :locale)
    end
  end
end
