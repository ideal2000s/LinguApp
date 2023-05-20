# frozen_string_literal: true

module VideoURLType
  extend ActiveSupport::Concern
  const_set(
    'VIDEO_URL_RULES',
    [
      %r{https?://(?:www\.)?youtu(?:be\.com/watch\?v=|\.be/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?},
      %r{https?://(.+)?(wistia\.com|wi\.st)/(medias|embed)/.*},
      %r{https?://(.+)?(elevkanalen.no)/e/fullvideo/.*}
    ].freeze
  )

  def video_url_format
    url_field = respond_to?('url') ? send('url') : send('video_url')
    return if url_field.blank? || VIDEO_URL_RULES.any? { |rule| url_field.match?(rule) }

    errors.add(:video_url, I18n.t(:unsupported_url_format, scope: 'task_items.video.errors'))
  end
end
