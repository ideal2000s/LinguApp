# frozen_string_literal: true

class TaskItems::Embed::Form < TaskItems::BasicForm
  VIDEO_URL_RULES = [
    %r{https?://(?:www\.)?youtu(?:be\.com/watch\?v=|\.be/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?},
    %r{https?://(.+)?(wistia\.com|wi\.st)/(medias|embed)/.*}
  ].freeze

  attribute :task, Tasks::Embed
  attribute :item, TaskItems::Embed
  attribute :url, String, default: ->(form, _attr) { form.item&.url }
  validates :url, presence: true

  def self.params_schema
    %i[url]
  end
end
