# frozen_string_literal: true

module TaskItemOptions
  class AudioUploader < ::AudioUploader
    def generate_location(io, record: nil, **context)
      record = record.becomes(TaskItemOption) if need_cast?(record, TaskItemOption)
      super(io, record: record, **context)
    end
  end
end
