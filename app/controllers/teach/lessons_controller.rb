# frozen_string_literal: true

module Teach
  class LessonsController < ApplicationController # rubocop:disable Metrics/ClassLength
    before_action :authorize_action, except: %i[index draft pending approved published new create status reviewable search] # rubocop:disable Rails/LexicallyScopedActionFilter

    def index
      authorize_action(Lesson)
      render :draft, locals: { lessons: scope.includes(:author).page(params[:page]) }
    end

    Lesson.statuses.each do |k, _v|
      define_method k do
        authorize_action(Lesson)
        render k, locals: { lessons: scope.includes(:author).page(params[:page]) }
      end
    end

    def published
      authorize_action(Lesson)
      render :published, locals: { lessons: scope.includes(:author).page(params[:page]) }
    end

    def new
      lesson = scope.new
      authorize_action(lesson)
      render :new, locals: { lesson: lesson }
    end

    def create
      lesson = scope.new(lesson_params)
      authorize_action(lesson)

      if lesson.save
        redirect_to teach_lesson_path(lesson), notice: I18n.t('teach.lessons.create.success')
      else
        render :new, locals: { lesson: lesson }
      end
    end

    def show
      if lesson.tet?
        render :tet, locals: {
          lesson: lesson,
          tasks: lesson.tasks.kept.includes(:items),
          phrases: lesson.phrases
        }
      elsif lesson.storyline?
        render :storyline, locals: { lesson: lesson, tasks: lesson.tasks.kept.includes(:items) }
      end
    end

    def review
      publishable, statuses = ::Lessons::PublishableStatus.call(lesson)
      render :review, locals: {
        lesson: lesson,
        reviews: lesson.reviews.includes(:author),
        publishable: publishable,
        statuses: statuses
      }
    end

    def edit
      render :edit, locals: { lesson: lesson }
    end

    def update
      if lesson.update(lesson_params)
        redirect_to action: :show, notice: I18n.t('teach.lessons.create.success')
      else
        render :edit, locals: { lesson: lesson }
      end
    end

    def destroy
      notice = if lesson.discard
                 I18n.t('teach.lessons.destroy.success')
               else
                 I18n.t('teach.lessons.destroy.failure')
               end
      redirect_to action: :index, notice: notice
    end

    # TODO: move next 2 actions into separate controller
    def add_objective
      lesson.objectives << params.dig(:lesson, :objective)
      lesson.save

      render :add_objective, locals: { objectives: lesson.objectives, lesson: lesson }
    end

    def remove_objective
      index = params[:index]
      return head :no_content if index.to_i.to_s != index

      lesson.objectives.delete_at(index.to_i)
      lesson.save
      render :remove_objective, locals: { objectives: lesson.objectives, lesson: lesson }
    end

    def status
      authorize(lesson, "#{params[:status]}?", policy_class: policy_class)
      lesson.send("#{params[:status]}!".to_sym)

      redirect_to review_teach_lesson_path(lesson), notice: t(params[:status], scope: 'teach.lessons.review.status_updates')
    end

    def publish
      result = Teach::Lessons::Cases::Publish.call(lesson: lesson)

      if result.success?
        flash[:notice] = t('teach.lessons.review.published')
      else
        flash[:alert] = t('teach.lessons.review.publication_error')
      end

      redirect_to action: :review
    end

    def unpublish
      result = Teach::Lessons::Cases::Unpublish.call(lesson: lesson)

      if result.success?
        flash[:notice] = t('teach.lessons.review.unpublished')
      else
        flash[:alert] = t('teach.lessons.review.unpublication_error')
      end

      redirect_to action: :review
    end

    def reviewable
      authorize_action(Lesson)
      courses = Course.kept.by_language(current_user.language_scope)
      @search = Lesson.kept.for_review(current_user).ransack(params[:q])
      render :reviewable, locals: { lessons: @search.result.order(:title), courses: courses }
    end

    def search
      lessons = scope.where.not(id: Lesson.joins(:course_section)
                                          .where(course_sections: { course_id: params[:course_id] })
                                          .select(:id))
                     .where('title ILIKE ?', "%#{params[:q]}%")
      render :search, locals: { items: lessons }
    end

    private

    def lesson
      @lesson ||= scope.find(params[:id])
    end

    def authorize_action(record = lesson)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Teach::LessonPolicy
    end

    def scope
      policy_scope(Lesson, policy_scope_class: Teach::LessonPolicy::Scope)
    end

    def lesson_params
      params.require(:lesson).permit(
        :title, :language_id, :support_language_id, :kind, :objectives, :description,
        :credits, :level, :parent_id, :team_id, :frontend_color, :image, tags: [], skill_ids: []
      )
    end
  end
end
