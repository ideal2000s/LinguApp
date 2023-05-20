# frozen_string_literal: true

module Tasks
  class Webpage::Form < BasicForm
    attribute :task, Tasks::Webpage
    attribute :score_method, String, default: 'no_score'

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
