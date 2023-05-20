# frozen_string_literal: true

class TaskItems::SelectVideo::Form < TaskItems::BasicForm
  attribute :item, TaskItems::SelectVideo
  attribute :task, Tasks::SelectVideo
  attribute :question, String, default: ->(form, _attr) { form.item&.question }
  attribute :video_data, String, default: ->(form, _attr) { form.item&.video_data }
  attribute :remove_video, Boolean, default: false
  validates :question, presence: true

  def self.params_schema
    %i[question video_data remove_video]
  end
end
