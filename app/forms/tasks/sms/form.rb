# frozen_string_literal: true

module Tasks
  class SMS::Form < BasicForm
    attribute :task, Tasks::SMS
    attribute :score_method, String, default: 'manual'

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
        @task.update(attributes.slice(:title, :score_method, :instruction))
      end
    end
  end
end
