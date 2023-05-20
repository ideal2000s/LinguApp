# frozen_string_literal: true

module Cron
  class DictionaryImportWipeJob < ::ApplicationJob
    queue_as :default

    def perform
      Dictionary::ImportWord.joins(:import).where('dictionary_imports.created_at > ?', 30.days.ago).delete_all
      Dictionary::Import.where('created_at > ?', 30.days.ago).delete_all
    end
  end
end
