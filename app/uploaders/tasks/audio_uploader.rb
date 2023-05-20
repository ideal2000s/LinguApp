# frozen_string_literal: true

module Tasks
  class AudioUploader < ::AudioUploader
    def generate_location(io, record: nil, **context)
      record = record.becomes(Task) if need_cast?(record, Task)
      super(io, record: record, **context)
    end
  end
end
