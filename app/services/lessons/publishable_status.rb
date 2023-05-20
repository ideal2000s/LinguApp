# frozen_string_literal: true

module Lessons
  class PublishableStatus
    MIN_LESSON_GLOSSARY = 5
    MAX_LESSON_GLOSSARY = 30

    attr_accessor :lesson, :user

    def initialize(lesson)
      @lesson = lesson
      @user = lesson.author
    end

    def self.call(lesson)
      new(lesson).call
    end

    def call
      statuses = {
        user_profile: user_profile,
        lesson_glossary: lesson_glossary,
        user_credits: user_credits,
        lesson_approval: lesson_approval
      }

      publishable = statuses.values.filter(&:!).empty?
      [publishable, statuses]
    end

    private

    def user_credits
      true
      # Lesson::PUBLISH_SPEND < user.credits.to_i
    end

    def user_profile
      user.profile_complete?
    end

    def lesson_glossary
      lesson.phrases.size.between?(MIN_LESSON_GLOSSARY, MAX_LESSON_GLOSSARY)
    end

    def lesson_approval
      lesson.reviews.approved.any?
    end
  end
end
