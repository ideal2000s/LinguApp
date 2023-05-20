# frozen_string_literal: true

class AnimationUploader < ApplicationUploader
  plugin :validation_helpers
  plugin :remove_attachment

  Attacher.validate do
    validate_max_size 1.megabytes, message: 'is too large (max is 1MB)'
    validate_mime_type %w[application/json application/javascript text/plain]
    validate_extension %w[json]
  end
end
