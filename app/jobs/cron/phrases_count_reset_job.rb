# frozen_string_literal: true

module Cron
  class PhrasesCountResetJob < ::ApplicationJob
    queue_as :default

    def perform
      Course.find_each(&:set_phrases_count)
    end
  end
end
