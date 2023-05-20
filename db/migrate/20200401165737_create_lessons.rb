class CreateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :lessons do |t|
      t.belongs_to :author
      t.string :title
      t.datetime :discarded_at, index: true
      t.timestamps
    end
  end
end
