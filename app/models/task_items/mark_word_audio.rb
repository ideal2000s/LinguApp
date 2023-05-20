# frozen_string_literal: true

# == Schema Information
#
# Table name: task_items
#
#  id           :bigint           not null, primary key
#  task_id      :bigint
#  type         :string           not null
#  context      :jsonb            not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  position     :integer          default(0), not null
#  translations :jsonb
#

module TaskItems
  class MarkWordAudio < ::TaskItem
    WORD_REGEXP = Regexp.compile(/\*?[[:alnum:]](?:[[:alnum:]\-'`]*[[:alnum:]'`])*\*?/)
    SINGLE_WHITELIST_REGEXP = Regexp.compile(/[[:alnum:]\-'`*]/)
    SOLUTION_REGEXP = Regexp.compile(/\*([[:alnum:]'`-]+)\*/)
    WORD_KEY = 'word'
    DISABLED_KEY = 'disabled'
    SOLUTION_KEY = 'solution'

    include AudioUploader::Attachment(:audio)

    belongs_to :task,
               class_name: 'Tasks::MarkWordAudio',
               inverse_of: :items,
               touch: true

    store_accessor :context,
                   :statement,
                   :clean_statement,
                   :prepared_statement,
                   :audio_data

    acts_as_list scope: :task

    def statement=(val)
      super(val)
      prepare_statement_data
      statement
    end

    def functional?
      return false unless prepared_statement.reject { |e| e[SOLUTION_KEY] }.none? do |statement|
        statement['word'].start_with?('*') || statement['word'].end_with?('*')
      end

      audio.present? && prepared_statement.filter { |e| e[SOLUTION_KEY] }.size.positive?
    end

    private

    def prepare_statement_data
      self.prepared_statement = prepare_statement(statement)
    end

    def prepare_statement(statement)
      statement.each_char.with_object(String.new).with_index.with_object([]) do |data, set|
        str, index = data
        char, word = str
        unless both_match?(word, char) || both_not_match?(word, char)
          set << word_data(word.dup) unless word.empty?
          word.clear
        end
        word.concat(char)
        set << word_data(word.dup) if statement.size == index + 1
      end
    end

    def word_data(word)
      {
        WORD_KEY => clean_word(word),
        DISABLED_KEY => !word_match?(word),
        SOLUTION_KEY => word.match?(SOLUTION_REGEXP)
      }
    end

    def clean_word(word)
      scan = word.scan(SOLUTION_REGEXP)
      scan.any? ? scan.flatten.first : word
    end

    def char_match?(char)
      char.match?(SINGLE_WHITELIST_REGEXP)
    end

    def word_match?(word)
      word == '*' || word.match?(WORD_REGEXP)
    end

    def both_match?(word, char)
      word_match?(word) && char_match?(char)
    end

    def both_not_match?(word, char)
      !word_match?(word) && !char_match?(char)
    end
  end
end
