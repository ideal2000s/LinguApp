# frozen_string_literal: true

module TaskItems
  class AudioUploader < ::AudioUploader
    def generate_location(io, record: nil, **context)
      record = record.becomes(TaskItem) if need_cast?(record, TaskItem)
      super(io, record: record, **context)
    end
  end
end
