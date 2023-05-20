# frozen_string_literal: true

module Teach
  module Tasks
    module Cases
      class Create < Micro::Case::Strict
        attributes :form

        def call!
          if (task = Task.create(form.attributes))
            Success(task: task, form: form)
          else
            Failure(:create_error) { { form: form, task: task } }
          end
        end
      end
    end
  end
end
