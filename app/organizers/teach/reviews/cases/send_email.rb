# frozen_string_literal: true

module Teach
  module Reviews
    class Cases::SendEmail < Micro::Case::Strict
      attributes :review

      def call!
        Teach::LessonMailer.with(review: review).new_lesson_review.deliver_later
        Success(review: review)
      end
    end
  end
end
