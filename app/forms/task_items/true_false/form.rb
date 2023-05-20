# frozen_string_literal: true

class TaskItems::TrueFalse::Form < TaskItems::BasicForm
  attribute :item, TaskItems::TrueFalse
  attribute :task, Tasks::TrueFalse
  attribute :statement, String, default: ->(form, _attr) { form.item&.statement }
  attribute :veracity, Boolean, default: ->(form, _attr) { form.item&.veracity }
  validates :statement, presence: true
  validates :veracity, inclusion: { in: [true, false], allow_blank: false }

  def self.params_schema
    %i[statement veracity]
  end
end
