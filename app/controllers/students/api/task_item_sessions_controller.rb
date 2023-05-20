# frozen_string_literal: true

module Students::API
  class TaskItemSessionsController < ApplicationController
    include TaskItemSessionFinders

    def show
      authorize_action

      render :show, locals: { task_session: task_session, task_item_session: task_item_session }
    end

    def update
      # process answer
      # trigger event
    end

    def authorize_action(record = lesson)
      authorize(record, 'any?', policy_class: policy_class)
    end

    def policy_class
      Students::TaskPolicy
    end
  end
end
