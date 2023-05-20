# frozen_string_literal: true

class TaskItems::FillInBlanks::Form < TaskItems::BasicForm
  attribute :item, TaskItems::FillInBlanks
  attribute :task, Tasks::FillInBlanks
  attribute :question, String, default: ->(form, _attr) { form.item&.question }
  validates :question, presence: true
  attribute :audio, ActiveStorage::Attached::One
  attribute :remove_audio, Boolean, default: false

  def self.params_schema
    %i[question audio remove_audio]
  end
end
