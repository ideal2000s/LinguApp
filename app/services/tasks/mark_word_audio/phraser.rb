# frozen_string_literal: true

module Tasks
  class MarkWordAudio::Phraser < PhraserBase
    private

    def phrases
      result = super

      task.items.each do |task_item|
        result << task_item.clean_statement
      end

      result
    end
  end
end
