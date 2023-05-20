# frozen_string_literal: true

module Tasks
  class SelectText::SolutionEvaluator < SolutionEvaluatorBase
    def correct?(item_session)
      # convert nil to false
      corrects = item_session.options.map { |h| [h['task_item_option_id'], h['answer'] || false] }.to_h

      item_session.task_item.options.all? { |option| corrects[option.id] == option.correct }
    end
  end
end
