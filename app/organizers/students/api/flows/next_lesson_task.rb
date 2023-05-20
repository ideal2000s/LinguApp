# frozen_string_literal: true

module Students::API
  module Flows
    class NextLessonTask < Micro::Case::Strict
      attributes :lesson_session

      flow Cases::NextLessonTask,
           Cases::CalculateLessonDuration
    end
  end
end
