# frozen_string_literal: true

module Teach
  module Reviews
    class Cases::Delete < Micro::Case::Strict
      attributes :review

      def call!
        review.destroy

        Success(review: review)
      end
    end
  end
end
