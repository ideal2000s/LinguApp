class WordGameGameTypeUniqueness < ActiveRecord::Migration[6.0]
  def change
    execute <<-SQL
      CREATE UNIQUE INDEX game_type_constraint ON task_items (task_id, (context->>'game_type')) WHERE task_items.type = 'TaskItems::WordGames';
    SQL
  end
end
