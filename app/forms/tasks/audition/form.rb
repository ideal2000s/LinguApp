# frozen_string_literal: true

module Tasks
  class Audition::Form < BasicForm
    attribute :task, Tasks::Audition
    attribute :score_method, String, default: 'fractional'
    attribute :audio_duration, Integer, default: ->(form, _attr) { form.task.audio_duration || 0 }
    attribute :instruction,
              String,
              default: ->(form, _attr) { form.task&.instruction }

    def skip_introduction?
      true
    end

    def self.params_schema
      super.concat(%i[audio_duration instruction])
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:instruction, :introduction))
      end
    end
  end
end
