# frozen_string_literal: true

class TaskItems::ImageObject::Form < TaskItems::BasicForm
  attribute :item, TaskItems::ImageObject
  attribute :task, Tasks::ImageObject
  attribute :left, Float, default: ->(form, _attr) { form.item&.left }
  attribute :top, Float, default: ->(form, _attr) { form.item&.top }
  attribute :width, Float, default: ->(form, _attr) { form.item&.width }
  attribute :height, Float, default: ->(form, _attr) { form.item&.height }
  attribute :audio, ActiveStorage::Attached::One
  attribute :instruction, String, default: ->(form, _attr) { form.item&.instruction }
  attribute :remove_audio, Boolean, default: false

  def self.params_schema
    %i[left top width height audio instruction remove_audio]
  end
end
