class CreateCandidates < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, index: { unique: true }
      t.string :mobile
      t.string :locale
      t.datetime :discarded_at, index: true

      t.timestamps
    end
  end
end
