# frozen_string_literal: true

module Teach
  class ReviewsController < ApplicationController
    layout 'authoring/preview'

    before_action only: %i[index] do
      prepend_view_path('app/views/teach/preview')
    end

    def index
      authorize_action(scope)
      @lesson_color = lesson.meta['frontend_color']
      render :index, locals: { lesson: lesson, reviews: scope.includes(:author).ordered, new_review: scope.new }
    end

    def create
      authorize_action(scope.new) # this adds empty review to lesson.reviews scope
      result = Reviews::Flows::Create.call(scope: scope, params: review_params.to_hash)

      if result&.success?
        render :create, locals: { lesson: lesson, reviews: scope.ordered }
      else
        render 'shared/error', locals: { message: result.value }
      end
    end

    def destroy
      authorize_action(review)
      result = Reviews::Flows::Delete.call(review: review)

      if result&.success?
        render :create, locals: { lesson: lesson, reviews: scope.ordered }
      else
        render 'shared/error', locals: { message: result.value }
      end
    end

    private

    def review_params
      params.require(:review).permit(:content, :status).merge(author: current_user)
    end

    def authorize_action(record = review)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Teach::LessonReviewPolicy
    end

    def lesson_policy(record)
      Teach::LessonPolicy.new(current_user, record)
    end
    helper_method :lesson_policy

    def review
      @review ||= scope.find(params[:id])
    end

    def scope
      policy_scope(lesson.reviews, policy_scope_class: Teach::LessonReviewPolicy::Scope)
    end

    def lesson
      @lesson ||= Lesson.kept.includes(tasks: :items).find(params[:lesson_id]) # lesson_scope.find params[:lesson_id]
    end

    def lesson_scope
      policy_scope(Lesson, policy_scope_class: Teach::LessonPolicy::Scope)
    end
  end
end
