# frozen_string_literal: true

class TaskItems::Webpage::Form < TaskItems::BasicForm
  VIDEO_URL_RULES = [
    /(^https?)/
  ].freeze

  attribute :item, TaskItems::Webpage
  attribute :url, String, default: ->(form, _attr) { form.item&.url }
  validates :url, presence: true

  def self.params_schema
    %i[url]
  end
end
