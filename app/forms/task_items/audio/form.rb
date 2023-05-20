# frozen_string_literal: true

class TaskItems::Audio::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Audio
  attribute :task, Tasks::Audio
  attribute :minimum_duration, Integer, default: ->(form, _attr) { form.item&.minimum_duration }
  validates :minimum_duration, presence: true, numericality: { greater_than: 0 }

  def self.params_schema
    %i[minimum_duration]
  end
end
