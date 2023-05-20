# frozen_string_literal: true

module School
  class TeamPresenter
    TOP_STUDENTS_COUNT = 4
    TOP_LESSONS_COUNT = 3

    def initialize(team)
      @team = team
    end

    def completed_lessons_count
      @team.team_students.joins(:student)
           .joins(student: :lesson_sessions)
           .merge(LessonSession.completed)
           .count
    end

    def total_time_spent
      time = @team.team_students.joins(student: :lesson_sessions).sum('lesson_sessions.duration')
      return '0m' unless time.positive?

      ChronicDuration.output(time, format: :short, units: 2, limit_to_hours: true)
    end

    def students_by_level
      students_by_level = []
      StudentTargetLanguage.levels.each_key do |level|
        count_by_level = @team.team_students.students_by_level(StudentTargetLanguage.levels[level]).count
        students_by_level.push({ level: level, count: count_by_level })
      end
      students_by_level
    end

    def top_lessons
      LessonSession
        .joins(:student).joins(student: :team_students)
        .where(team_students: { team_id: @team.id })
        .select('lesson_id, count(lesson_id) as lessons_count')
        .group('lesson_id')
        .order(lessons_count: :desc)
        .includes(:lesson).first(TOP_LESSONS_COUNT)
    end

    def top_score_students
      Student
        .joins(:team_students).left_joins(:lesson_sessions)
        .where(team_students: { team_id: @team.id })
        .where.not(lesson_sessions: { duration: 0 })
        .group('students.id')
        .order('sum(lesson_sessions.duration) desc')
        .limit(TOP_STUDENTS_COUNT)
    end

    def inactive_students
      @team.team_students.where(active_license_id: nil).includes(:student).last(TOP_STUDENTS_COUNT)
    end
  end
end
