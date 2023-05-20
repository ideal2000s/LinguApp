# frozen_string_literal: true

module Teach
  module Reviews
    class Cases::UpdateLessonStatus < Micro::Case::Strict
      attributes :review

      def call!
        update_lesson_status
        Success(review: review)
      end

      private

      def update_lesson_status
        lesson = review.lesson

        # HACK: lesson.reviews contains empty review created during policy check
        lesson.reviews.each { |e| lesson.reviews.delete(e) unless e.persisted? }

        if lesson.reviews.approved.any?
          lesson.approved!
        else
          lesson.pending!
          lesson.update(published: false)
        end
      end
    end
  end
end
