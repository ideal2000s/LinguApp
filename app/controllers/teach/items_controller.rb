# frozen_string_literal: true

module Teach
  class ItemsController < ApplicationController
    before_action :find_task
    before_action :find_item, only: %i[edit update destroy move_up move_down]
    before_action :authorize_action

    def create
      form = item_form.new(item_params)
      item = form.valid? ? @task.items.create(form.attributes) : @task.items.new

      respond_to do |f|
        f.html { redirect_to edit_teach_lesson_task_path(@task.lesson_id, @task) }
        f.js { render :create, locals: { task: @task, item: item, form: form } }
      end
    end

    def edit; end

    def update
      # TODO: merge with item attributes to fill blank fields - this will remove .compact hack
      form = item_form.new(item_params.merge(item: @item))
      @item.update(form.attributes.compact) if form.valid?
      respond_to do |f|
        f.html { redirect_to edit_teach_lesson_task_path(@task.lesson_id, @task) }
        f.json { respond_with_bip(form, param: :task_item) }
      end
    end

    def destroy
      @item.destroy
      respond_to do |f|
        f.html { redirect_back(fallback_location: edit_admin_task_path(@task)) }
        f.js { render :destroy, locals: { item: @item } }
      end
    end

    def move_up
      @item.move_higher
      respond_to do |f|
        f.html { redirect_back(fallback_location: admin_task_path(@task)) }
        f.js { render :reorder_items, locals: { task: @task } }
      end
    end

    def move_down
      @item.move_lower
      respond_to do |f|
        f.html { redirect_back(fallback_location: admin_task_path(@task)) }
        f.js { render :reorder_items, locals: { task: @task } }
      end
    end

    private

    def authorize_action(record = @task.lesson)
      authorize(record, 'edit?', policy_class: policy_class)
    end

    def policy_class
      Teach::LessonPolicy
    end

    def find_task
      @task = Task.find(params[:task_id])
    end

    def lesson
      @task.lesson
    end
    delegate :team, to: :lesson, prefix: false, allow_nil: true

    def find_item
      @item = @task.items.find(params[:id])
    end

    def item_form
      @task.items.form
    end

    def current_team_user
      team.team_users.find_by(user: current_user)
    end

    def item_params
      params.require(:task_item).permit(
        *item_form.params_schema
      ).merge(task: @task)
    end
  end
end
