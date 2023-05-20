# frozen_string_literal: true

class ImageUploader < ApplicationUploader
  plugin :pretty_location, namespace: '/', class_underscore: true
  plugin :store_dimensions

  Attacher.validate do
    validate_max_size 20.megabytes
    validate_mime_type %w[image/jpeg image/jpg image/png image/svg+xml image/webp image/tiff image/gif]
    validate_extension %w[jpg jpeg png svg webp tiff tif gif]
  end

  Attacher.derivatives do |original|
    converter = ImageProcessing::MiniMagick.source(original)
    converted = converter.convert(:jpg).loader(page: 0)
    {
      thumbnail: converted.resize_to_fill(128, 128).saver(interlace: 'plane').call,
      catalog: converted.resize_to_fill(25, 128).saver(interlace: 'plane').call
    }
  end
end
