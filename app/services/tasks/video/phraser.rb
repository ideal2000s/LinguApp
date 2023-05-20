# frozen_string_literal: true

module Tasks
  class Video::Phraser < PhraserBase
    private

    def phrases
      result = super

      task.items.each do |task_item|
        result << task_item.caption.to_plain_text
      end

      result
    end
  end
end
