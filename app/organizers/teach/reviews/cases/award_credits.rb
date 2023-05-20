# frozen_string_literal: true

module Teach
  module Reviews
    class Cases::AwardCredits < Micro::Case::Strict
      attributes :review

      def call!
        update_author_credits

        Success(review: review)
      end

      private

      def update_author_credits
        user = review.author
        credits = user.credits
        user.update!(credits: (credits + Lesson::REVIEW_REWARD))
      end
    end
  end
end
