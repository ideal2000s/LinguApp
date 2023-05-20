# frozen_string_literal: true

class PDFUploader < Shrine
  Attacher.validate do
    validate_mime_type %w[application/pdf]
    validate_extension %w[pdf]
  end
end
