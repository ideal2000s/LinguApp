# frozen_string_literal: true

class TaskItems::ImageHotspot::Form < TaskItems::BasicForm
  attribute :item, TaskItems::ImageHotspot
  attribute :task, Tasks::ImageHotspot
  attribute :word_id, String, default: ->(form, _attr) { form.item&.word&.id }
  attribute :task_item_word_id, String, default: ->(form, _attr) { form.item&.task_item_word&.id }
  attribute :left, Float, default: ->(form, _attr) { form.item&.left }
  attribute :top, Float, default: ->(form, _attr) { form.item&.top }
  attribute :width, Float, default: ->(form, _attr) { form.item&.width }
  attribute :height, Float, default: ->(form, _attr) { form.item&.height }
  validates :word_id, presence: true

  def self.params_schema
    %i[word_id left top width height]
  end

  def attributes(*args)
    super.except(:word_id, :task_item_word_id).merge(task_item_word_attributes: { id: task_item_word_id, word_id: word_id })
  end
end
