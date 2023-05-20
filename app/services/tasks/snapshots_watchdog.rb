# frozen_string_literal: true

module Tasks
  class SnapshotsWatchdog
    INTERVAL_DAYS = 2.days

    def call
      answered_tasks.each do |task|
        ::Tasks::PerformanceUpdaterJob.perform_later(task)
      end
    end

    private

    def answered_tasks
      Task
        .joins('LEFT OUTER JOIN tasks AS snapshots ON snapshots.parent_id = tasks.id')
        .where('snapshots.created_at > ?', INTERVAL_DAYS.ago)
        .uniq
    end
  end
end
