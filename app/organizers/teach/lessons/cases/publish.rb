# frozen_string_literal: true

module Teach
  module Lessons
    class Cases::Publish < Micro::Case::Strict
      attributes :lesson

      def call!
        Lesson.transaction do
          publishable, _statuses = ::Lessons::PublishableStatus.call(lesson)

          if publishable
            lesson.update!(published: true)
            # update_user_credits

            Success(lesson: lesson)
          else
            Failure(:status) { 'Lesson cannot be published' }
          end
        end
      end

      private

      def update_user_credits
        user = lesson.author
        current_credits = user.credits
        user.update!(credits: current_credits - Lesson::PUBLISH_SPEND)
      end
    end
  end
end
