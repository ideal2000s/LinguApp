class AddMetaToLanguages < ActiveRecord::Migration[6.0]
  def change
    add_column :languages, :meta, :jsonb, null: false, default: {}

    Language.support.find_each do |l|
      translation_note = "The web UI for Lingu was translated by Google on 26 Jan 2021, from English source file into #{l.system_name}."
      l.update(translation_note: translation_note)
    end
  end
end
