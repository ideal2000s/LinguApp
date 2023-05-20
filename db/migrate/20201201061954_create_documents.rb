class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.references :task_item, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.references :team, foreign_key: true
      t.text :content
      t.text :audio_data
      t.integer :status, null: false, default: 0
      t.jsonb :context, null: false, default: {}
      t.integer :comments_count, null: false, default: 0

      t.timestamps
    end
  end
end
