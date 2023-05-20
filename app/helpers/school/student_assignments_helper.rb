# frozen_string_literal: true

module School
  module StudentAssignmentsHelper
    def student_assignment_status_tag(student_assignment)
      if student_assignment.reviewed?
        tag.div(class: 'assignment-student-status-pending font-weight-bold d-inline-block') do
          tag.i(class: 'fa fa-check mr-1') + I18n.t('school.assignments.reviewed')
        end
      else
        tag.div(class: 'assignment-student-status d-inline-block') do
          status_img(student_assignment) +
            I18n.t(student_assignment.status, scope: 'school.school_assignments.student_assignment.statuses')
        end
      end
    end

    def status_img(student_assignment)
      image_tag("icons/#{student_assignment.status}", class: 'mr-1') unless student_assignment.answered?
    end
  end
end
