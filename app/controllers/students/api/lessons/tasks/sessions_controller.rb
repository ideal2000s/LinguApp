# frozen_string_literal: true

module Students
  module API
    module Lessons
      module Tasks
        class SessionsController < ApplicationController
          include TaskSessionFinders

          def show
            authorize_action
            render :show, locals: { lesson_session: lesson_session, task_session: task_session }
          end

          def self.local_prefixes
            ['students/api/task_sessions']
          end

          private

          def authorize_action(record = lesson)
            authorize(record, 'any?', policy_class: policy_class)
          end

          def policy_class
            Students::TaskPolicy
          end
        end
      end
    end
  end
end
