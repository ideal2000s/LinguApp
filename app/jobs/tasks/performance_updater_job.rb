# frozen_string_literal: true

module Tasks
  class PerformanceUpdaterJob < ::ApplicationJob
    def perform(task)
      Tasks::PerformanceUpdater.new(task).call
    end
  end
end
