# frozen_string_literal: true

module Colors
  extend ActiveSupport::Concern
  included do
    const_set(
      'COLOR_ARRAY',
      %w[#f9fafd #00a5d7 #8dc63f #f7941e #ef4036 #eb2486 #8371ce].freeze
    )

    const_set(
      'PREVIEW_COLOR_ARRAY',
      [%w[#F9FAFD #C5CCDB], %w[#7BD0E7 #0481B7], %w[#BACA5D #4AAD57], %w[#FFA439 #F4691B],
       %w[#FE886A #EA4230], %w[#E4679C #9C0650], %w[#AF71CC #472685]].freeze
    )
  end
end
