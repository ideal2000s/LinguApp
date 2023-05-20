# frozen_string_literal: true

module Teach
  module Tasks
    module Cases
      class ValidateOnUpdate < Micro::Case::Strict
        attributes :task, :params

        def call!
          task.assign_attributes(form.attributes)
          if form.valid?
            Success(form: form, task: task)
          else
            Failure(:validation_error) { { form: form, task: task, lesson: task.lesson } }
          end
        rescue Shrine::Error
          Failure(I18n.t('tasks.errors.failure'))
        end

        private

        def form
          @form ||= form_class.new(params.merge(task: task))
        end

        def form_class
          task.form
        end
      end
    end
  end
end
