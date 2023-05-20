# frozen_string_literal: true

module Tasks
  class ItemQuestionsPhraser < PhraserBase
    private

    def phrases
      result = super
      result += task.items.map(&:question)
      result
    end
  end
end
