# frozen_string_literal: true

module TaskItems
  class ImageUploader < ::ImageUploader
    Attacher.derivatives do |original|
      vips = ImageProcessing::MiniMagick.source(original)
      converted = vips.convert(:jpg)
      {
        thumbnail: converted.resize_to_fill!(128, 128)
      }
    end

    def generate_location(io, record: nil, **context)
      record = record.becomes(TaskItem) if need_cast?(record, TaskItem)
      super(io, record: record, **context)
    end
  end
end
