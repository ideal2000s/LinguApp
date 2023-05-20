# frozen_string_literal: true

class TaskItems::TranslatableText::Form < TaskItems::BasicForm
  attribute :item, TaskItems::TranslatableText
  attribute :task, Tasks::TranslatableText
  attribute :content, String, default: ->(form, _attr) { form.item&.content }
  validates :content, presence: true

  def self.params_schema
    %i[content audio remove_audio]
  end
end
