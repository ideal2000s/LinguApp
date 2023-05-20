# frozen_string_literal: true

# == Schema Information
#
# Table name: task_items
#
#  id           :bigint           not null, primary key
#  task_id      :bigint
#  type         :string           not null
#  context      :jsonb            not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  position     :integer          default(0), not null
#  translations :jsonb
#

module TaskItems
  class WordGames < ::TaskItem
    GAME_TYPES = %w[flashcard waterfall match match_single nodes recall].freeze
    belongs_to :task,
               class_name: 'Tasks::WordGames',
               inverse_of: :items,
               touch: true
    store_accessor :context, :game_type, :enabled

    acts_as_list scope: :task

    before_destroy :undestroyable, unless: :destroyed_by_association

    validates :game_type, inclusion: { in: GAME_TYPES }

    validate :immovable_first, :unique_game_type
    validate :readonly_game_type, on: :update

    def undestroyable
      throw(:abort)
    end

    def immovable_first
      return unless position_changed?
      return if position == position_was

      errors.add('position', 'immovable first') if position != 1 && flashcard?
      errors.add('position', 'wrong first game type') if position == 1 && !flashcard?
    end

    def unique_game_type
      errors.add('game_type', 'unique') if task.items.exists?(["id IS DISTINCT FROM ?
                                                                AND context->>'game_type' = ?", id, game_type])
    end

    def readonly_game_type
      errors.add('game_type', 'readonly') if game_type_changed?
    end

    def movable_up?
      !(first? || position == 2)
    end

    def movable_down?
      !(first? || last?)
    end

    def enabled?
      enabled
    end

    def flashcard?
      game_type == 'flashcard'
    end
  end
end
