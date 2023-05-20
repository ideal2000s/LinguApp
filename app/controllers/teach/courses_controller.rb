# frozen_string_literal: true

module Teach
  class CoursesController < ApplicationController
    include LessonGlossaryHelper

    before_action :authorize_action, except: %i[index new create]

    def index
      authorize_action(Course)
      render :index, locals: { courses: scope.includes(:rich_text_description, :lessons) }
    end

    def new
      course = scope.new
      render :new, locals: { course: course }
    end

    def create
      course = scope.new(course_params)
      authorize_action(course)

      if course.save
        redirect_to teach_courses_path, notice: t('.success')
      else
        render :new, locals: { course: course }
      end
    end

    def show
      render :show, locals: { course: course, sections: course.course_sections.order(:id) }
    end

    def edit
      render :edit, locals: { course: course }
    end

    def update
      if course.update(course_params)
        redirect_to teach_course_path(course), notice: t('.success')
      else
        render :edit, locals: { course: course }
      end
    end

    def destroy
      notice = if course.discard
                 I18n.t('teach.courses.destroy.success')
               else
                 I18n.t('teach.courses.destroy.failure')
               end
      redirect_to action: :index, notice: notice
    end

    private

    def course
      @course ||= scope.friendly.find(params[:id])
    end

    def authorize_action(record = course)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Teach::CoursePolicy
    end

    def scope
      policy_scope(Course, policy_scope_class: Teach::CoursePolicy::Scope)
    end

    def course_params
      params.require(:course).permit(:title, :description, :image, :remove_image, :slug,
                                     :language_id, :level, :estimated_time, :published, :frontend_color)
    end
  end
end
