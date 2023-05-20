# frozen_string_literal: true

class TaskItems::ArrangeWords::Form < TaskItems::BasicForm
  attribute :item, TaskItems::ArrangeWords
  attribute :task, Tasks::ArrangeWords
  attribute :arrange_words, String, default: ->(form, _attr) { form.item&.arrange_words }
  attribute :additional_words, String, default: ->(form, _attr) { form.item&.additional_words }
  attribute :hint, String, default: ->(form, _attr) { form.item&.hint }
  attribute :audio, ActiveStorage::Attached::One
  attribute :remove_audio, Boolean, default: false
  validates :arrange_words, presence: true

  def self.params_schema
    %i[arrange_words additional_words audio remove_audio hint]
  end
end
