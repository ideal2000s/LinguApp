# frozen_string_literal: true

json.assignments do
  json.array! assignments do |assignment|
    json.extract! assignment, :id, :language_id, :name, :context, :instruction
    json.team do
      json.partial! 'students/api/teams/team', locals: { team: assignment.team }
    end
    json.student_assignment do
      json.partial! 'students/api/student_assignments/student_assignment', locals: {
        student_assignment: assignment.recent_student_assignment(student)
      }
    end
  end
end
