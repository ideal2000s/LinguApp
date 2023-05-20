# frozen_string_literal: true

module School
  module AssignmentsHelper
    mattr_accessor :assignment_type_class_names, instance_writer: false
    self.assignment_type_class_names = {
      'Tasks::Essay' => 'text',
      'Tasks::Audio' => 'audio'
    }.freeze

    def assignment_type_tag(assignable)
      type_class = assignment_type_class(assignable)
      tag.div(class: "#{type_class}-task-type mb-0") do
        image_tag("icons/response_#{type_class}.svg", class: 'mr-1') +
          I18n.t(type_class, scope: 'layouts.school.assignments.responses')
      end
    end

    def assignment_type_class(assignable)
      case assignable
      when Task
        assignment_type_class_names.fetch(assignable.type)
      when Assignment
        assignable.context
      else
        'text'
      end
    end
  end
end
