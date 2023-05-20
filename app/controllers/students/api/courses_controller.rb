# frozen_string_literal: true

module Students::API
  class CoursesController < ApplicationController
    include Students::API::PerPage
    skip_before_action :authenticate_student!

    def index
      render :index, locals: {
        courses: course_scope.ransack(params[:q])
                             .result(distinct: true)
                             .page(params[:page])
                             .per(per_page)
      }
    end

    def show
      render :show, locals: { course: course }
    end

    def ratings
      ratings = rating_scope.order(created_at: :desc).limit(Course::RATINGS_LIMIT)
      ratings_count = rating_scope.count
      render :ratings, locals: { ratings: ratings, ratings_count: ratings_count }
    end

    private

    def course_scope
      Course.kept.published.includes(:language, :team, :rich_text_description)
    end

    def rating_scope
      Rating.by_course(course.id)
    end

    def course
      @course ||= course_scope.includes(course_sections: { base_lessons: :author }).friendly.find(params[:id])
    end

    def student_native_language_id
      @student_native_language_id = current_student&.native_language&.id
    end
  end
end
