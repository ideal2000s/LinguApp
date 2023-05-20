# frozen_string_literal: true

module TaskItemOptions
  class SelectImage < ::TaskItemOption
    class ImageUploader < TaskItemOptions::ImageUploader
      Attacher.derivatives do |original|
        vips = ImageProcessing::MiniMagick.source(original)
        converted = vips.convert(:jpg)
        {
          thumbnail: converted.resize_to_fill!(128, 128),
          lesson_ui: converted.resize_to_fill!(195, 195)
        }
      end
    end
  end
end
