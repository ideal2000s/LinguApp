# frozen_string_literal: true

module TaskItemOptions
  class ImageUploader < ::ImageUploader
    Attacher.derivatives do |original|
      vips = ImageProcessing::MiniMagick.source(original)
      converted = vips.convert(:jpg)
      {
        thumbnail: converted.resize_to_fill!(128, 128),
        content_thumbnail: converted.resize_to_fill!(170, 96),
        lesson_ui: converted.resize_to_fit!(870, nil)
      }
    end

    def generate_location(io, record: nil, **context)
      record = record.becomes(TaskItemOption) if need_cast?(record, TaskItemOption)
      super(io, record: record, **context)
    end
  end
end
