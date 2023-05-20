# frozen_string_literal: true

module Students::API
  module Flows
    class CreateLessonSession < Micro::Case::Strict
      flow Cases::CreateLessonSession,
           Cases::NextLessonTask
    end
  end
end
