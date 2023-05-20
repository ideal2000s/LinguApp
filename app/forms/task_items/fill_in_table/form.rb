# frozen_string_literal: true

class TaskItems::FillInTable::Form < TaskItems::BasicForm
  attribute :item, TaskItems::FillInTable
  attribute :task, Tasks::FillInTable
  attribute :audio, Hash, default: ->(form, _attr) { form.item&.audio_data }
  attribute :question, String, default: ->(form, _attr) { form.item&.question }
  attribute :options_attributes, Hash, default: :options_attributes_default
  validates :question, presence: true, if: ->(form) { form.audio.blank? && form.item.blank? }
  validates :audio, presence: true, if: ->(form) { form.question.blank? && form.item.blank? }

  def self.params_schema
    [:audio, :question, { options_attributes: :answer }]
  end

  def options_attributes_default
    options_attributes.presence || {
      '0' => { answer: '' },
      '1' => { answer: '' }
    }
  end
end
