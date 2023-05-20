# frozen_string_literal: true

class TaskItems::InlineDropdown::Form < TaskItems::BasicForm
  attribute :item, TaskItems::InlineDropdown
  attribute :task, Tasks::InlineDropdown
  attribute :statement, String, default: ->(form, _attr) { form.item&.statement }
  validates :statement, presence: true
  attribute :audio, ActiveStorage::Attached::One
  attribute :remove_audio, Boolean, default: false

  def self.params_schema
    %i[statement audio remove_audio]
  end
end
