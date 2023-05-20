class CreateCandidateSolutions < ActiveRecord::Migration[5.2]
  def change
    create_table :student_solutions do |t|
      t.jsonb :solution, default: {}, null: false
      t.jsonb :task_snapshot, default: {}, null: false
      t.boolean :correct, default: false
      t.integer :score
      t.datetime :discarded_at, index: true

      t.timestamps
    end
  end
end
