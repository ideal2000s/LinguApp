class ChangeFrequencyAbsToOccurences < ActiveRecord::Migration[6.0]
  def change
    rename_column :dictionary_words, :frequency_abs, :occurrences
  end
end
