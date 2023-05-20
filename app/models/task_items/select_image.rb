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
  class SelectImage < ::TaskItem
    belongs_to :task,
               class_name: 'Tasks::SelectImage',
               inverse_of: :items,
               touch: true

    has_many :options,
             -> { order(:id) },
             class_name: 'TaskItemOptions::SelectImage',
             foreign_key: :task_item_id,
             inverse_of: :item,
             dependent: :destroy

    before_save :check_single

    store_accessor :context, :question, :single_choice

    private

    def check_single
      self.single_choice = options.to_a.select(&:correct?).size == 1
    end
  end
end
