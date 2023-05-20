class CreateDictionaryImportWordJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionary_import_words do |t|
      t.references(:dictionary_import, null: false, foreign_key: true)
      t.references(:dictionary_word, null: false, foreign_key: true)
      t.index(%i[dictionary_import_id dictionary_word_id], unique: true, name: 'index_import_words_on_import_id_and_word_id')

      t.timestamps
    end
  end
end
