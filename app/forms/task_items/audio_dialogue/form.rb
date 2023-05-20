# frozen_string_literal: true

class TaskItems::AudioDialogue::Form < TaskItems::BasicForm
  attribute :item, TaskItems::AudioDialogue
  attribute :task, Tasks::AudioDialogue
  attribute :audio, ActiveStorage::Attached::One
  attribute :position, String, default: ->(form, _attr) { form.item&.position }
  attribute :partner_name,
            String,
            default: ->(form, _attr) { form.item&.partner_name }
  validates :audio, presence: true
  validates :partner_name, presence: true

  validates :audio,
            file_size: {
              less_than_or_equal_to: 20.megabytes,
              message: 'Audio should be less than %{count}'
            },
            file_content_type: {
              allow: %w[audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3]
            }

  def self.params_schema
    %i[audio position partner_name]
  end
end
