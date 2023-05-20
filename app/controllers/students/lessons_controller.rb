# frozen_string_literal: true

module Students
  class LessonsController < ApplicationController
    skip_before_action :authenticate_student!

    layout 'examination'

    def index
      render :static
    end

    def show
      render :show, locals: { lesson: lesson }
    end

    private

    def lesson
      @lesson ||= lesson_scope.find(params[:id])
    end

    def lesson_scope
      Lesson.kept.published
    end
  end
end
