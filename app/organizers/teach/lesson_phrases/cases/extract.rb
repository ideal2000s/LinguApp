# frozen_string_literal: true

module Teach
  module LessonPhrases
    module Cases
      class Extract < Micro::Case::Strict
        attributes :lesson

        def call!
          Success(lesson: lesson, phrases: phrases_compacted)
        end

        def phrases_compacted
          phrases.flatten.compact.reject(&:blank?).sort.uniq
        end

        def phrases
          lesson.tasks.kept.map do |task|
            "#{task.type}::Phraser".constantize.new(task).call
          end
        end
      end
    end
  end
end
