# frozen_string_literal: true

class TaskItems::MarkWordAudio::Form < TaskItems::BasicForm
  attribute :item, TaskItems::MarkWordAudio
  attribute :task, Tasks::MarkWordAudio
  attribute :statement, String, default: ->(form, _attr) { form.item&.statement }
  attribute :audio, Hash, default: ->(form, _attr) { form.item&.audio_data }
  attribute :remove_audio, Boolean, default: false
  validates :statement, presence: true

  def self.params_schema
    %i[statement audio remove_audio]
  end
end
