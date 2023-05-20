# frozen_string_literal: true

module Teach
  module LessonPhrases
    module Flows
      class Generate < Micro::Case::Safe
        flow Cases::Extract,
             Cases::Filter,
             Cases::Store
      end
    end
  end
end
