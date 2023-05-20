# frozen_string_literal: true

module Students::API
  class RatingsController < ApplicationController
    before_action :authenticate_student!

    def create
      rating = scope.new(create_params)
      return render_record(rating) if rating.save

      render_validate_error(rating)
    end

    def update
      return render_record(rating) if rating.update(update_params)

      render_validate_error(rating)
    end

    private

    def render_record(record)
      render :create, locals: { rating: record, lesson: record.lesson.reload }
    end

    def render_validate_error(record)
      render json: { error: record.errors.full_messages }, status: :unprocessable_entity
    end

    def create_params
      params
        .require(:rating)
        .permit(:lesson_id, :rate)
    end

    def update_params
      params
        .require(:rating)
        .permit(:rate)
    end

    def rating
      @rating ||= scope.find(params[:id])
    end

    def scope
      current_student.ratings
    end
  end
end
