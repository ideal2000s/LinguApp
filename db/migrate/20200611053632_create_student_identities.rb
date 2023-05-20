class CreateStudentIdentities < ActiveRecord::Migration[6.0]
  def change
    create_table :student_identities do |t|
      t.references :student, null: false, foreign_key: true
      t.string :uid
      t.string :provider

      t.timestamps
    end
  end
end
