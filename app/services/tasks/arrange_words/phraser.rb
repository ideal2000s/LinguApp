# frozen_string_literal: true

module Tasks
  class ArrangeWords::Phraser < PhraserBase
    private

    def phrases
      result = super

      task.items.each do |task_item|
        result << task_item.words
      end

      result
    end
  end
end
