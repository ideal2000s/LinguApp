# frozen_string_literal: true

module Tasks
  class WordGames::Form < BasicForm
    attribute :task, Tasks::WordGames

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
        @task.update(attributes.slice(:instruction))
      end
    end
  end
end
