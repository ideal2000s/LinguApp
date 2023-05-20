# frozen_string_literal: true

class TaskItems::MarkWord::Form < TaskItems::BasicForm
  attribute :item, TaskItems::MarkWord
  attribute :task, Tasks::MarkWord
  attribute :statement, String, default: ->(form, _attr) { form.item&.statement }
  validates :statement, presence: true

  def self.params_schema
    %i[statement]
  end
end
