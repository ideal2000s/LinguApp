# frozen_string_literal: true

class TaskItems::Email::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Email
  attribute :task, Tasks::Email
  attribute :minimum_words, Integer, default: ->(form, _attr) { form.item&.minimum_words }
  attribute :subject, String, default: ->(form, _attr) { form.item&.subject }
  attribute :body, String, default: ->(form, _attr) { form.item&.body }
  attribute :from_name, String, default: ->(form, _attr) { form.item&.from_name }
  attribute :from_email, String, default: ->(form, _attr) { form.item&.from_email }
  validates :minimum_words, presence: true, numericality: { greater_than: 0 }

  def self.params_schema
    %i[minimum_words subject body from_email from_name]
  end
end
