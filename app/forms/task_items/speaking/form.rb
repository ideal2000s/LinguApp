# frozen_string_literal: true

class TaskItems::Speaking::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Speaking
  attribute :task, Tasks::Speaking
  attribute :audio, ActiveStorage::Attached::One
  attribute :sentence, String, default: ->(form, _attr) { form.item&.sentence }
  attribute :remove_audio, Boolean, default: false
  validates :sentence, presence: true

  def self.params_schema
    %i[audio sentence remove_audio]
  end
end
