# frozen_string_literal: true

class SvgUploader < ApplicationUploader
  plugin :validation_helpers

  Attacher.validate do
    validate_max_size 1.megabytes, message: 'is too large (max is 1MB)'
    validate_mime_type %w[image/svg+xml image/svg]
    validate_extension %w[svg]
  end
end
