# frozen_string_literal: true

class Tasks::Email::Form < Tasks::BasicForm
  attribute :task, Tasks::Email
  attribute :score_method, String, default: 'manual'

  def save
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    ActiveRecord::Base.transaction do
      @task.update(attributes.slice(:title, :instruction, :introduction))
    end
  end
end
