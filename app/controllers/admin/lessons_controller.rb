# frozen_string_literal: true

module Admin
  class LessonsController < ApplicationController
    before_action :authorize_action, except: %i[index]
    layout 'admin/wide'

    def index
      authorize_action(Lesson)
      @search = scope.ransack(params[:q])
      courses = Course.kept.by_language(current_user.language_scope)

      render :index, locals: {
        lessons: @search.result.includes(:author, team: :owner).page(params[:page]), courses: courses
      }
    end

    def show
      @lesson_color = lesson.meta['frontend_color']
      render :show, locals: { lesson: lesson, reviews: scope.includes(:author), new_review: scope.new }
    end

    def edit
      render :edit, locals: { lesson: lesson }
    end

    def update
      if lesson.update(lesson_params)
        redirect_to action: :edit, notice: I18n.t('teach.lessons.update.success')
      else
        render :edit, locals: { lesson: lesson }
      end
    end

    private

    def lesson
      @lesson ||= scope.find(params[:id])
    end

    def authorize_action(record = lesson)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::LessonPolicy
    end

    def scope
      policy_scope(Lesson, policy_scope_class: Admin::LessonPolicy::Scope)
    end

    def lesson_params
      params.require(:lesson).permit(
        :title, :language_id, :support_language_id, :kind, :objectives, :description, :status,
        :credits, :level, :parent_id, :team_id, :frontend_color, :published, tags: [], skill_ids: []
      )
    end
  end
end
