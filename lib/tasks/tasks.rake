# frozen_string_literal: true

namespace :tasks do
  desc 'fix old snapshots to receive correct examination_skill_results'
  task fix_old_snapshots: :environment do
    Task.original.includes(:examination_tasks).find_each do |task|
      Tasks::PerformanceUpdater.new(task).call
    end

    ::Task.snapshots.includes(:parent).find_each do |snapshot|
      parent = snapshot.parent

      next if parent.blank?

      snapshot.skills = parent.skills
      ::Task
        .where(id: snapshot.id)
        .update_all(rank: parent.rank, performance: parent.performance) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  desc 'fix tasks section for TET lesson'
  task fix_section: :environment do
    Task.kept.joins(:lesson).where(lessons: { kind: 'tet' }).each do |task|
      task_availability = task.class.availability
      task.update(subject: task_availability.first) unless task_availability.include?(task.subject)
    end
  end
end
