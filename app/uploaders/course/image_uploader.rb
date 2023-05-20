# frozen_string_literal: true

class Course::ImageUploader < ::ImageUploader
  Attacher.derivatives do |original|
    converter = ImageProcessing::MiniMagick.source(original)
    converted = converter.convert(:jpg).loader(page: 0)
    {
      thumbnail: converted.resize_to_fill!(128, 128),
      large_banner: converted.resize_to_fill!(860, 470),
      mobile_banner: converted.resize_to_fill!(380, 300)
    }
  end
end
