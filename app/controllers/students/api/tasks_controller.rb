# frozen_string_literal: true

module Students::API
  class TasksController < ApplicationController
    include TaskFinders

    def show
      authorize_action
      render :show, locals: { task: task, student: current_student, lesson: lesson }
    end

    private

    def task
      @task = task_scope.find(params[:id])
      @task.locale = language_selector
      @task
    end

    def first_item
      task.items.first
    end

    def language_selector
      current_student.native_locale
    end

    def authorize_action(record = lesson)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Students::TaskPolicy
    end
  end
end
