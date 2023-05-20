# frozen_string_literal: true

module Tasks
  class NullSolutionEvaluator < SolutionEvaluatorBase
    def call
      0
    end
  end
end
