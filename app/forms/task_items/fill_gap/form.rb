# frozen_string_literal: true

class TaskItems::FillGap::Form < TaskItems::BasicForm
  attribute :item, TaskItems::FillGap
  attribute :task, Tasks::FillGap
  attribute :statement, String, default: ->(form, _attr) { form.item&.statement }
  validates :statement, presence: true
  attribute :audio, ActiveStorage::Attached::One
  attribute :remove_audio, Boolean, default: false

  def self.params_schema
    %i[statement audio remove_audio]
  end
end
