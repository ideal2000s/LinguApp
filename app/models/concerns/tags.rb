# frozen_string_literal: true

module Tags
  extend ActiveSupport::Concern
  included do
    const_set(
      'TAG_ARRAY',
      %w[general academic business legal health sport travel fashion food art nature religion].freeze
    )
  end
end
