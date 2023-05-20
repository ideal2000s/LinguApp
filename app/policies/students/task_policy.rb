# frozen_string_literal: true

module Students
  class TaskPolicy
    attr_reader :student, :lesson

    def initialize(current_student, lesson = nil)
      @student = current_student
      @lesson = lesson
    end

    def show?
      return true unless lesson.language.restricted?

      student.plans.exists?(language: lesson.language)
    end

    def any?
      show?
    end
  end
end
