# frozen_string_literal: true

module Tasks
  class InlineDropdown::Phraser < PhraserBase
    private

    def phrases
      result = super

      task.items.each do |task_item|
        result << task_item.clean_statement.gsub(/\*/, '')
      end

      result
    end
  end
end
