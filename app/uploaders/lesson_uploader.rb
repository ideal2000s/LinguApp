# frozen_string_literal: true

class LessonUploader < ImageUploader
  Attacher.default_url do |**options|
    version = options[:derivative] || 'original'
    model = record.class.to_s.underscore
    ActionController::Base.helpers.image_url("uploader/defaults/#{model}/#{version}.png")
  end
  Attacher.derivatives do |original|
    converter = ImageProcessing::MiniMagick.source(original)
    converted = converter.loader(page: 0).convert(:png)
    {
      thumbnail: converted.resize_to_fill(128, 128).saver(interlace: 'line').call,
      large_banner: converted.resize_to_fill(860, 470).saver(interlace: 'line').call,
      mobile_banner: converted.resize_to_fill(380, 300).saver(interlace: 'line').call,
      card_image: converted.resize_to_fill(254, 196).saver(interlace: 'line').call
    }
  end
end
