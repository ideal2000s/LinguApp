# frozen_string_literal: true

class CSVUploader < Shrine
  Attacher.validate do
    validate_max_size 1024.megabytes, message: 'is too large (max is 1GB)'
    validate_mime_type %w[text/csv text/plain]
    validate_extension %w[csv]
  end
end
