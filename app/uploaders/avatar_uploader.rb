# frozen_string_literal: true

class AvatarUploader < ImageUploader
  # Attacher.default_url do |**options|
  #  version = options[:derivative] || 'original'
  #  model = record.class.to_s.underscore
  #  "uploader/defaults/#{model}/#{version}.png"
  # end

  Attacher.derivatives do |original|
    vips = ImageProcessing::MiniMagick.source(original)
    converted = vips.convert(:png)
    {
      tiny: converted.resize_to_fill!(34, 34),
      square: converted.resize_to_fill!(88, 88),
      thumbnail: converted.resize_to_fill!(128, 128),
      brand: converted.resize_to_fit!(150, 75)
    }
  end
end
