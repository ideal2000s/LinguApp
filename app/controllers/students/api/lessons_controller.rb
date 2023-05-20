# frozen_string_literal: true

module Students::API
  class LessonsController < ApplicationController
    include Students::API::PerPage
    skip_before_action :authenticate_student!, except: :phrases

    def index
      render :index, locals: {
        lessons: lesson_scope.ransack(params[:q])
                             .result(distinct: true)
                             .page(params[:page])
                             .per(per_page)
      }
    end

    def show
      is_following = TeamFollower.find_by(team: lesson.team, student: current_student).present?
      subjects = lesson.tasks.kept.group_by(&:subject)

      render :show, locals: { lesson: lesson, is_following: is_following, subjects: subjects }
    end

    def phrases
      render :phrases, locals: {
        phrases: phrases_collection,
        student_words: student_words_collection,
        student: current_student
      }
    end

    def filter
      lessons = lesson_scope.ransack(params[:q])

      render :index, locals: { lessons: lessons }
    end

    private

    def lesson_scope
      Lesson.kept.published.includes(:author, :language, :support_language).order(:title)
    end

    def lesson
      @lesson ||= lesson_scope.find(params[:id])
    end

    def phrases_collection
      lesson.phrases.includes(:language)
    end

    def student_words_collection
      current_student.student_words.where(word_id: phrases_collection.select(:id))
    end
  end
end
