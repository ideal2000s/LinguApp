class CreateCandidateItemSolutions < ActiveRecord::Migration[6.0]
  def change
    create_table :student_item_solutions do |t|
      t.references :task_item, null: false, foreign_key: true
      t.references :student_solution, null: false, foreign_key: true
      t.jsonb :context

      t.timestamps
    end
  end
end
