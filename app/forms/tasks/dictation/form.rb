# frozen_string_literal: true

module Tasks
  class Dictation::Form < BasicForm
    attribute :task, Tasks::Dictation
    attribute :score_method, String, default: 'fractional'
    attribute :instruction,
              String,
              default: ->(form, _attr) { form.task&.instruction }

    def save
      if valid?
        persist!
        true
      else
        false
      end
    end

    def skip_introduction?
      true
    end

    def self.params_schema
      super.concat(%i[instruction])
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:introduction, :title))
      end
    end
  end
end
