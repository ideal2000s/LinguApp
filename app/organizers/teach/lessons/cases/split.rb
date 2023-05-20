# frozen_string_literal: true

module Teach
  module Lessons
    class Cases::Split < Micro::Case::Strict
      attributes :lesson, :params

      def call!
        new_lesson = Lesson.create(new_lesson_attributes)

        return Success(new_lesson) if new_lesson.persisted?

        Failure()
      end

      private

      def new_lesson_attributes
        attributes = lesson.attributes.except('id').merge(params)
        attributes[:status] = :draft
        attributes
      end
    end
  end
end
