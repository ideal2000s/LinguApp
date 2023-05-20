class AddColorRequiredToDictionaryWords < ActiveRecord::Migration[6.0]
  def change
    add_column :dictionary_words, :color_required, :boolean, default: false
  end
end
