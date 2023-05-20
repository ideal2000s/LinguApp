# frozen_string_literal: true

module Tasks
  class ArrangeWords::Form < BasicForm
    attribute :task, Tasks::ArrangeWords
    attribute :score_method, String, default: 'fractional'
    attribute :instruction,
              String,
              default: ->(form, _attr) { form.task&.instruction }

    def self.params_schema
      super.concat(%i[instruction])
    end

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

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:title, :instruction, :introduction))
      end
    end
  end
end
