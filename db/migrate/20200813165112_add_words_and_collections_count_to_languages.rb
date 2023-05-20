class AddWordsAndCollectionsCountToLanguages < ActiveRecord::Migration[6.0]
  def change
    add_column :languages, :words_count, :integer, null: false, default: 0
    add_column :languages, :collections_count, :integer, null: false, default: 0
    Language.find_each { |e| Language.reset_counters(e.id, :words_count, :collections_count) };
  end
end
