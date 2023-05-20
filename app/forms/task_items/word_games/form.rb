# frozen_string_literal: true

class TaskItems::WordGames::Form < TaskItems::BasicForm
  attribute :item, TaskItems::WordGames
  attribute :task, Tasks::WordGames
  attribute :enabled, Boolean

  def self.params_schema
    %i[enabled]
  end
end
