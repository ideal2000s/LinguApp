class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, index: { unique: true }
      t.string :mobile
      t.string :locale
      t.integer :role, default: 0, null: false
      t.integer :status, default: 0, null: false
      t.jsonb :meta, null: false, default: {}
      t.datetime :discarded_at, index: true

      t.timestamps
    end
  end
end
