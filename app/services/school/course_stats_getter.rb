# frozen_string_literal: true

module School
  class CourseStatsGetter
    attr_accessor :course

    def initialize(course)
      @course = course
    end

    class << self
      def durations(*args)
        new(*args).durations
      end
    end

    def durations
      per_week_duration = duration_range(in_one_month, 'week')
      per_month_duration = duration_range(in_one_year, 'month')
      per_year_duration = duration_range(in_last_years, 'year')
      {
        week_duration: per_week_duration, month_duration: per_month_duration, year_duration: per_year_duration,
        duration_steps: {
          week: duration_step(per_week_duration), month: duration_step(per_month_duration), year: duration_step(per_year_duration)
        }
      }
    end

    private

    def task_session_scope
      TaskSession.joins(lesson_session: { lesson: { course_section: :course } }).where(courses: { id: course.id })
    end

    def duration_hash(session_scope, duration)
      session_scope
        .group("date_trunc('#{duration}', task_sessions.created_at)")
        .sum('task_sessions.duration')
        .sort
        .map { |k, v| [k.strftime(time_selector(duration)), v.to_i] }.to_h
    end

    def duration_range(date_range, duration)
      duration_hash(task_session_scope.where(created_at: date_range), duration)
    end

    def time_selector(duration)
      case duration
      when 'week'
        '%d %b'
      when 'month'
        '%Y %b'
      else
        '%Y'
      end
    end

    def duration_step(duration_hash)
      (duration_hash.values.max.to_f / 4).ceil
    end

    def today
      Time.zone.today
    end

    def in_one_month
      today - 1.month..1.day.ago
    end

    def in_one_year
      today.beginning_of_month - 1.year..1.day.ago
    end

    def in_last_years
      Time.zone.local(2020, 0o1, 0o1)..1.day.ago
    end
  end
end
