class CreateCandidateOptionSolutions < ActiveRecord::Migration[6.0]
  def change
    create_table :student_option_solutions do |t|
      t.references :task_item_option, null: false, foreign_key: true
      t.references :student_item_solution, null: false, foreign_key: true
      t.jsonb :context

      t.timestamps
    end
  end
end
