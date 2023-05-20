# frozen_string_literal: true

module Students
  class CoursesController < ApplicationController
    skip_before_action :authenticate_student!

    layout 'examination'

    def show
      course
      render :show, status: :ok, locals: { course: course }
    end

    private

    def course
      @course ||= course_scope.friendly.find(params[:id])
    end

    def course_scope
      Course.kept.published
    end
  end
end
