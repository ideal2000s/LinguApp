# frozen_string_literal: true

module Tasks
  class InlineDropdown::SolutionEvaluator < SolutionEvaluatorBase
    def correct?(item_session)
      item_session.answers.zip(item_session.task_item.correct_answers).all? do |answer, correct|
        correct == answer
      end
    end
  end
end
