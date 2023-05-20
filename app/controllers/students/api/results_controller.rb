# frozen_string_literal: true

module Students::API
  class ResultsController < ApplicationController
    def index
      authorize_action

      render :index, locals: {
        task_sessions: task_sessions,
        task_items_published_count: task_sessions.flat_map(&:task_item_sessions).length,
        task_items_correctly_answered_count: task_sessions.flat_map(&:task_item_sessions).select(&:correct).length
      }
    end

    private

    def task_sessions
      @task_sessions ||= lesson_session.task_sessions
                                       .includes(:task, task_item_sessions: { task_item: :options })
                                       .where(tasks: { subject: 'test' })
                                       .order('tasks.position')
                                       .order('task_items.position')
    end

    def lesson_session_scope
      current_student.lesson_sessions
    end

    def lesson_session
      @lesson_session ||= lesson_session_scope.find(params[:lesson_session_id])
    end

    def authorize_action(record = lesson_session)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Students::ResultPolicy
    end
  end
end
