# frozen_string_literal: true

module Teach
  module Tasks
    module VideoCategorizeHelper
      def video_categorize(url)
        if url.include?('youtube.com')
          'youtube'
        else
          'wistia'
        end
      end

      def get_youtube_id(url)
        url = url.gsub(/(>|<)/i, '').split(%r{(vi/|v=|/v/|youtu\.be/|/embed/)})
        return url if url[2].nil?

        url[2].split(/[^0-9a-z_\-]/i)[0]
      end
    end
  end
end
