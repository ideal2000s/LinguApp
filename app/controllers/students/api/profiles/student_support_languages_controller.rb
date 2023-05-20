# frozen_string_literal: true

module Students
  module API
    module Profiles
      class StudentSupportLanguagesController < ApplicationController
        def create
          student_support_language = scope.new(create_params)
          return render_record(student_support_language) if student_support_language.save

          render_validate_error(student_support_language)
        end

        def update
          return render_record(student_support_language) if student_support_language.update(update_params)

          render_validate_error(student_support_language)
        end

        def destroy
          student_support_language.destroy!
          head :no_content
        end

        private

        def render_record(record)
          render :show, locals: { student_support_language: record }
        end

        def render_validate_error(record)
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end

        def create_params
          params
            .require(:student_support_language)
            .permit(:language_id, :native)
        rescue ActionController::ParameterMissing
          params
            .require(:student_support_languages)
            .permit(:language_id, :native)
        end

        def update_params
          params
            .require(:student_support_language)
            .permit(:native)
        rescue ActionController::ParameterMissing
          params
            .require(:student_support_languages)
            .permit(:native)
        end

        def student_support_language
          scope.find(params[:id])
        end

        def scope
          current_student.student_support_languages
        end
      end
    end
  end
end
