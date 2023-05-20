# frozen_string_literal: true

module Teach
  module Tasks
    module Cases
      class Update < Micro::Case::Strict
        attributes :task, :form

        def call!
          if task.update(form.attributes)
            Success(task: task, form: form)
          else
            Failure(:update_error) { { form: form, task: task, lesson: task.lesson } }
          end
        end
      end
    end
  end
end
