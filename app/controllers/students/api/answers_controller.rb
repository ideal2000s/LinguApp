# frozen_string_literal: true

module Students::API
  class AnswersController < ApplicationController
    def create
      authorize_action

      result = Flows::CreateItemAnswers.call(
        task_session: task_session,
        answers: answers_params
      )

      result.on_success { render 'create', locals: { task_session: task_session } }
            .on_failure { render json: { error: result.value }, status: :forbidden }
    end

    private

    def lesson_session
      @lesson_session ||= current_student.lesson_sessions.find(params[:lesson_session_id])
    end

    def task_session
      @task_session ||= lesson_session.task_sessions.find(params[:task_session_id])
    end

    def answers_params
      params
        .permit(answer: task_session.task.answer_schema)
        .tap { |permitted_params| permitted_params.require(:answer) }
    end

    def answer_params
      task_session.task.answer_schema
    end

    def authorize_action(record = lesson)
      authorize(record, 'any?', policy_class: policy_class)
    end

    def policy_class
      Students::TaskPolicy
    end
  end
end
