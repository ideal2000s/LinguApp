# frozen_string_literal: true

module Tasks
  class ImageUploader < ::ImageUploader
    Attacher.derivatives do |original|
      vips = ImageProcessing::MiniMagick.source(original)
      converted = vips.convert(:jpg)
      {
        thumbnail: converted.resize_to_fill!(128, 128),
        content: converted.resize_to_fit!(870, 456),
        cover: converted.resize_to_fill!(921, 496),
        cover_mobile: converted.resize_to_fill!(343, 232)
      }
    end

    def generate_location(io, record: nil, **context)
      record = record.becomes(Task) if need_cast?(record, Task)
      super(io, record: record, **context)
    end
  end
end
