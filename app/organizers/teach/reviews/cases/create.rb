# frozen_string_literal: true

module Teach
  module Reviews
    class Cases::Create < Micro::Case::Strict
      attributes :params, :scope

      def call!
        review = scope.create(params)

        if review.persisted?
          Success(review: review)
        else
          Failure(:create_error) { review.errors.full_messages.join(', ') }
        end
      end
    end
  end
end
