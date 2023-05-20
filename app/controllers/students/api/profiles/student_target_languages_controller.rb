# frozen_string_literal: true

module Students
  module API
    module Profiles
      class StudentTargetLanguagesController < ApplicationController
        def create
          student_target_language = scope.new(create_params)
          return render_record(student_target_language) if student_target_language.save

          render_validate_error(student_target_language)
        end

        def update
          return render_record(student_target_language) if student_target_language.update(update_params)

          render_validate_error(student_target_language)
        end

        def destroy
          student_target_language.destroy!
          head :no_content
        end

        private

        def render_record(record)
          render :show, locals: { student_target_language: record }
        end

        def render_validate_error(record)
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end

        def create_params
          params
            .require(:student_target_language)
            .permit(:language_id, :level, :active)
        end

        def update_params
          params
            .require(:student_target_language)
            .permit(:level, :active)
        end

        def student_target_language
          @student_target_language ||= scope.find(params[:id])
        end

        def scope
          current_student.student_target_languages
        end
      end
    end
  end
end
