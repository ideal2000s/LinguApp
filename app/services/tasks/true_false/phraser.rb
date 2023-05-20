# frozen_string_literal: true

module Tasks
  class TrueFalse::Phraser < PhraserBase
    private

    def phrases
      result = super

      task.items.each do |task_item|
        result << task_item.statement
      end

      result
    end
  end
end
