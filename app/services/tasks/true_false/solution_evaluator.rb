# frozen_string_literal: true

module Tasks
  class TrueFalse::SolutionEvaluator < SolutionEvaluatorBase
    def correct?(item_session)
      item_session.answer == item_session.task_item.veracity
    end
  end
end
