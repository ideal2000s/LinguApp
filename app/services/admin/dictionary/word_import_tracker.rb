# frozen_string_literal: true

module Admin
  module Dictionary
    class WordImportTracker < Micro::Case
      attributes :user, :imported_words, :source_type

      def call!
        import = ::Dictionary::Import.new(user: user, name: "#{source_type}_#{Time.now.getlocal.strftime('%F %H:%M:%S')}")
        import.words = imported_words
        import.save!
        Success(true)
      end
    end
  end
end
