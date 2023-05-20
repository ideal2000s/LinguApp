# frozen_string_literal: true

module School
  class CourseSectionsController < ApplicationController
    layout 'school/empty'

    def show
      authorize_action
      render_show
    end

    def change_view_mode
      authorize_action
      current_user.update(table_view: params[:table_view_mode])
      render_show
    end

    def render_show
      render :show, locals: {
        course: course,
        course_section: course_section,
        lessons: lessons,
        table_view: current_user_table_view
      }
    end

    private

    def lessons
      course_section.lessons.kept.published
    end

    def current_user_table_view
      current_user.table_view.presence || 'list'
    end

    def course_section
      @course_section ||= scope.find(params[:id])
    end

    def course
      course_section.course
    end

    def authorize_action(record = Course)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::CourseSectionPolicy
    end

    def scope
      policy_scope(CourseSection, policy_scope_class: School::CourseSectionPolicy::Scope)
    end
  end
end
