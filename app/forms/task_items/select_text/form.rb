# frozen_string_literal: true

class TaskItems::SelectText::Form < TaskItems::BasicForm
  attribute :item, TaskItems::SelectText
  attribute :task, Tasks::SelectText
  attribute :question, String, default: ->(form, _attr) { form.item&.question }
  validates :question, presence: true

  def self.params_schema
    %i[question]
  end
end
