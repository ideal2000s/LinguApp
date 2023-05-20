# frozen_string_literal: true

module Lessons
  class LessonSessionPresenter
    attr_accessor :lesson_session

    def initialize(lesson_session)
      @lesson_session = lesson_session
    end

    def self.call(*args)
      new(*args).call
    end

    def call
      {
        sections: sections,
        progress: progress_summary
      }
    end

    private

    def sections
      tasks_by_subject.each_with_object({}) do |data, hash|
        subject, tasks = data
        hash[subject.to_sym] = {
          title: subject,
          progress: tasks_progress(tasks),
          tasks: tasks_summary(tasks)
        }
      end
    end

    def progress_summary
      task_items = (progress.presence || {}).values.flatten
      task_items_total = task_items.size
      task_items_completed = task_items.compact.sum
      {
        completed: task_items_completed,
        total: task_items_total,
        percents: task_items_total.zero? ? 0 : (task_items_completed.fdiv(task_items_total) * 100).to_i
      }
    end

    def lesson
      @lesson ||= lesson_session.lesson
    end

    def tasks
      @tasks ||= lesson.published_tasks
    end

    def tasks_by_subject
      @tasks_by_subject ||=
        Task.subjects.keys.index_with([]).merge(tasks.group_by(&:subject))
    end

    def tasks_progress(tasks)
      task_items_progress = tasks.flat_map { |task| progress[task.id.to_s] }.compact
      return 0 if task_items_progress.blank?

      (task_items_progress.sum.fdiv(task_items_progress.size) * 100).to_i
    end

    def tasks_summary(tasks)
      tasks.map do |task|
        {
          id: task.id,
          title: task.name,
          progress: tasks_progress([task])
        }
      end
    end

    def progress
      lesson_session.progress || {}
    end
  end
end
