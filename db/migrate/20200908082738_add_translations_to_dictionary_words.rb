class AddTranslationsToDictionaryWords < ActiveRecord::Migration[6.0]
  def change
    add_column :dictionary_words, :translations, :jsonb, default: {}
  end
end
