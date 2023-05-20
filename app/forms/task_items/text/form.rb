# frozen_string_literal: true

class TaskItems::Text::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Text
  attribute :task, Tasks::Text
  attribute :content, String, default: ->(form, _attr) { form.item&.content }
  validates :content, presence: true
  attribute :audio, Hash, default: ->(form, _attr) { form.item&.audio_data }
  attribute :remove_audio, Boolean, default: false

  def self.params_schema
    %i[content audio remove_audio]
  end

  def attributes(*args)
    super.tap do |form_attributes|
      if form_attributes[:audio].blank?
        form_attributes.delete(:audio)
        form_attributes[:remove_audio] = true
      end
    end
  end
end
