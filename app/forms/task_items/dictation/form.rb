# frozen_string_literal: true

class TaskItems::Dictation::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Dictation
  attribute :task, Tasks::Dictation
  attribute :audio, ActiveStorage::Attached::One
  attribute :remove_audio, Boolean, default: false
  attribute :sentence, String, default: ->(form, _attr) { form.item&.sentence }
  validates :sentence, presence: true

  def self.params_schema
    %i[sentence audio remove_audio]
  end
end
