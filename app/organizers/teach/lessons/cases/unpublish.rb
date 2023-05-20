# frozen_string_literal: true

module Teach
  module Lessons
    class Cases::Unpublish < Micro::Case::Strict
      attributes :lesson

      def call!
        Lesson.transaction do
          current_credits = lesson.author.credits
          lesson.author.update!(credits: current_credits + Lesson::PUBLISH_SPEND)
          lesson.update!(published: false)
        end

        Success(lesson: lesson)
      end
    end
  end
end
