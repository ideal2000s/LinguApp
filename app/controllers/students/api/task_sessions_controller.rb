# frozen_string_literal: true

module Students::API
  class TaskSessionsController < ApplicationController
    def index
      authorize_action
      render :index, locals: { lesson_session: lesson_session, task_sessions: lesson_session.task_sessions }
    end

    def show
      authorize_action
      task_session = lesson_session.current_task_session

      render :show, locals: { lesson_session: lesson_session, task_session: task_session }
    end

    def complete
      authorize_action
      result = Flows::CompleteTaskSession.call(task_session: task_session)

      if result.success?
        render :show, locals: { lesson_session: lesson_session, task_session: task_session }
      else
        render json: { error: result.value }
      end
    end

    def next
      authorize_action
      result = Flows::NextLessonTask.call(lesson_session: lesson_session)
      if result.success?
        render :show, locals: { lesson_session: lesson_session, task_session: result.value[:task_session] }
      else
        render json: { error: result.value }
      end
    end

    def answer
      authorize_action
      Flows::CreateItemAnswers.call(
        lesson_session: lesson_session,
        task_session: task_session,
        answers: answer_params[:answer]
      )
      render :show, locals: { lesson_session: lesson_session, task_session: task_session }
    end

    def heartbeat
      Heartbeat::Log.call(uid: params[:id])

      head :ok
    end

    private

    def task_session
      @task_session ||= lesson_session.task_sessions.find(params[:id])
    end

    def lesson_session
      @lesson_session ||= current_student.lesson_sessions.find(params[:lesson_session_id])
    end

    def answer_params
      params
        .permit(answer: task_session.answer_schema).tap do |answer|
          answer.require(:answer)
        end
    end

    def authorize_action(record = lesson_session.lesson)
      authorize(record, 'any?', policy_class: policy_class)
    end

    def policy_class
      Students::TaskPolicy
    end
  end
end
