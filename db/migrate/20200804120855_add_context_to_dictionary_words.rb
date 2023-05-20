class AddContextToDictionaryWords < ActiveRecord::Migration[6.0]
  def change
    add_column :dictionary_words, :context, :jsonb, null: false, default: {}
  end
end
