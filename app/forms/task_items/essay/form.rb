# frozen_string_literal: true

class TaskItems::Essay::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Essay
  attribute :task, Tasks::Essay
  attribute :minimum_words, Integer, default: ->(form, _attr) { form.item&.minimum_words }
  validates :minimum_words, presence: true, numericality: { greater_than: 0 }

  def self.params_schema
    %i[minimum_words]
  end
end
