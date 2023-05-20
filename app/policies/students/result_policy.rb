# frozen_string_literal: true

module Students
  class ResultPolicy < ApplicationPolicy
    alias student user
    alias lesson_session record

    def index?
      lesson_session.completed?
    end
  end
end
