# frozen_string_literal: true

class AudioUploader < ApplicationUploader
  plugin :pretty_location

  Attacher.validate do
    validate_max_size 20.megabyte
    validate_mime_type %w[audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3 audio/m4a audio/x-m4a]
    validate_extension %w[mp3 ogg vorbis wav m4a]
  end

  # TODO: remove in favor of create_on_promote option after release.
  class Attacher
    def promote(*)
      create_derivatives
      super
    end
  end
end
