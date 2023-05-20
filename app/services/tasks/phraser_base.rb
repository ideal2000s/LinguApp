# frozen_string_literal: true

require 'html_to_plain_text'

module Tasks
  class PhraserBase
    def initialize(task)
      @task = task
    end

    def call
      phrases_dissected
        .flatten
        .map(&:downcase)
        .sort
        .uniq
    end

    private

    def phrases_dissected
      phrases.compact.map { |e| e.split(/[^[[:word:]]]+/) }
    end

    def phrases
      result = []
      result << task.name
      result << HtmlToPlainText.plain_text(task.introduction)
      result
    end

    attr_reader :task
  end
end
