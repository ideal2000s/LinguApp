# frozen_string_literal: true

module Tasks
  class SolutionEvaluatorBase
    def initialize(task_session)
      @task_session = task_session
    end

    def call
      task_item_sessions.each do |item_session|
        item_session.update(correct: correct?(item_session))
      end
    end

    private

    attr_reader :task_session

    delegate :task_item_sessions, to: :task_session
  end
end
