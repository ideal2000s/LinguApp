class AddTranslationsToTaxonomies < ActiveRecord::Migration[6.0]
  class Skill < ActiveRecord::Base; end

  def change
    add_column :skills, :name_translations, :jsonb, null: false, default: {}
    Skill.reset_column_information
    Skill.all.each do |s|
      s.update(name_translations: { en: s.name })
    end
    remove_column :skills, :name, :string
  end
end

