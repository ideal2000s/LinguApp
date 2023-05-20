# frozen_string_literal: true

module School
  class DurationGetter < Micro::Case
    attributes :team

    def call!
      this_mon_duration = daily_duration_hash(in_this_month, month_duration(in_this_month))
      prev_mon_duration = daily_duration_hash(in_prev_month, month_duration(in_prev_month))
      avg_duration = this_mon_duration.merge(prev_mon_duration).values.max.to_f / 4
      duration_step = avg_duration.ceil(-(avg_duration.to_s.length - 1))
      Success(this_month: this_mon_duration, prev_month: prev_mon_duration, duration_step: duration_step)
    end

    private

    def task_session_scope
      return TaskSession.none if team.student_ids.empty?

      TaskSession.joins(:lesson_session).where('lesson_sessions.student_id = ANY(ARRAY[?])', team.student_ids)
    end

    def duration_hash(session_scope)
      session_scope.group('DATE(task_sessions.created_at)').sum('task_sessions.duration')
    end

    def month_duration(date_range)
      duration_hash(task_session_scope.where(created_at: date_range))
    end

    def in_this_month
      1.month.ago.to_date..1.day.ago
    end

    def in_prev_month
      2.months.ago.to_date..1.month.ago - 1.day
    end

    def daily_duration_hash(date_scope, duration)
      date_scope.map { |e| [e.strftime('%d %b'), duration.fetch(e, 0)] }.to_h
    end
  end
end
