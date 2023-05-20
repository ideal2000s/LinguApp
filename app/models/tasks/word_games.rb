# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint           not null, primary key
#  name               :string
#  type               :string           not null
#  introduction       :text
#  complexity         :integer          default("low")
#  performance        :float
#  ordered_solution   :boolean          default(FALSE)
#  discarded_at       :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  context            :jsonb            not null
#  published          :boolean          default(TRUE), not null
#  score_method       :integer          default("fractional"), not null
#  snapshot           :boolean          default(FALSE), not null
#  snapshot_timestamp :datetime
#  parent_id          :integer
#  subject            :integer          default("teach"), not null
#  rank               :integer          default(0)
#  lesson_id          :integer
#  position           :integer
#

module Tasks
  class WordGames < ::Task
    SolutionEvaluator = NullSolutionEvaluator
    include BaseType
    include TaskTypedRelations
    has_many :items,
             -> { order(position: :asc) },
             class_name: 'TaskItems::WordGames',
             foreign_key: :task_id,
             dependent: :destroy,
             inverse_of: :task

    after_initialize :build_items, if: :new_record?

    def build_items
      TaskItems::WordGames::GAME_TYPES.each do |game_type|
        items.build(game_type: game_type, enabled: true)
      end
    end

    def self.availability
      %w[engage]
    end
  end
end
