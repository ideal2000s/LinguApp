# frozen_string_literal: true

module StudentWords
  module Cases
    class Play < Micro::Case::Safe
      attributes :student, :word, :form

      attr_reader :student_word

      def call!
        find_or_create_student_word

        return Failure() unless student_word.persisted? && form.valid?

        increment_played_count
        increment_solved_count
        touch_last_failed_at

        Success()
      end

      private

      def find_or_create_student_word
        @student_word = StudentWord.where(word: word, student: student).first_or_initialize
        return if student_word.persisted?

        student_word.save
        Admin::StudentBadgeGranter.call(student: student)
      end

      def increment_played_count
        StudentWord.increment_counter(:played_count, student_word.id, touch: :last_played_at) # rubocop:disable Rails/SkipsModelValidations
      end

      def increment_solved_count
        return unless form.solved?

        StudentWord.increment_counter(:solved_count, student_word.id, touch: :last_solved_at) # rubocop:disable Rails/SkipsModelValidations
      end

      def touch_last_failed_at
        return if form.solved?

        student_word.touch(:last_failed_at)
      end
    end
  end
end
