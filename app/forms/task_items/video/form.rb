# frozen_string_literal: true

class TaskItems::Video::Form < TaskItems::BasicForm
  attribute :item, TaskItems::Video
  attribute :task, Tasks::Video
  attribute :url, String, default: ->(form, _attr) { form.item&.url }
  attribute :caption, String, default: ->(form, _attr) { form.item&.caption }
  validates :url, presence: true
  validate :video_url_format

  def self.params_schema
    %i[url caption]
  end

  def caption
    return super() unless item

    item.caption = super() if super().is_a?(String)
    item.caption
  end

  def attributes(*args)
    super.tap do |form_attributes|
      form_attributes[:caption] = form_attributes[:caption].to_s
    end
  end
end
