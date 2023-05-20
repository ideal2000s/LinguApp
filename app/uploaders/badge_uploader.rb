# frozen_string_literal: true

class BadgeUploader < ApplicationUploader
  plugin :validation_helpers

  Attacher.validate do
    validate_max_size 1.megabytes, message: 'is too large (max is 1MB)'
    validate_mime_type %w[image/svg+xml image/svg image/png]
    validate_extension %w[svg png]
  end
end
