class AddAssignableToDocuments < ActiveRecord::Migration[6.0]
  def change
    add_reference :documents, :assignable, polymorphic: true, null: false
  end
end
