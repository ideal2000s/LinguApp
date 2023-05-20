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
  class Speaking < ::Task
    SolutionEvaluator = NullSolutionEvaluator
    MIN_ITEMS_SIZE = 3
    include BaseType
    include TaskTypedRelations

    has_many :items,
             -> { order(position: :asc) },
             class_name: 'TaskItems::Speaking',
             foreign_key: :task_id,
             dependent: :destroy,
             inverse_of: :task

    store_accessor :context, :instruction

    def self.availability
      %w[engage]
    end

    def acceptable?
      functional_items.size >= MIN_ITEMS_SIZE
    end
  end
end
