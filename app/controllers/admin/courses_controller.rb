# frozen_string_literal: true

module Admin
  class CoursesController < ApplicationController
    include Teach::LessonGlossaryHelper

    before_action :authorize_action

    def index
      authorize_action(Course)
      render :index, locals: {
        courses: scope.includes(:rich_text_description, :lessons).page(params[:page])
      }
    end

    def show
      render :show, locals: { course: course, sections: course.course_sections.order(:id) }
    end

    def words
      render :words, locals: { course: course, phrases: course.phrases.includes(:language) }
    end

    def level_words
      frequency_scope = level_frequency_scope.fetch(course.level.to_s)
      phrases = course.phrases.includes(:language).order(:body).where(frequency: frequency_scope)
      missing_phrases = course.language.words.where(frequency: frequency_scope).where.not(id: phrases.select(:id))
      render :level_words, locals: {
        course: course, phrases: phrases, missing_phrases: missing_phrases
      }
    end

    def translate_words
      Admin::Dictionary::CourseWordsTranslatorJob.perform_later(course: course, target: I18n.locale.to_s)
      redirect_back(fallback_location: words_teach_course_path(course))
    end

    def reset_phrases_count
      Course.find_each(&:set_phrases_count)
      redirect_to admin_courses_path, notice: I18n.t('admin.courses.reset_phrases_count_notice')
    end

    private

    def course
      @course ||= scope.friendly.find(params[:id])
    end

    def authorize_action(record = Course)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::CoursePolicy
    end

    def scope
      policy_scope(Course, policy_scope_class: Admin::CoursePolicy::Scope)
    end

    def course_params
      params.require(:course).permit(:title, :description, :image, :remove_image)
    end
  end
end
