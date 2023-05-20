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
  class SelectText < ::TaskItem
    has_many :options,
             -> { order(:id) },
             class_name: 'TaskItemOptions::SelectText',
             foreign_key: :task_item_id,
             inverse_of: :item,
             dependent: :destroy

    belongs_to :task,
               class_name: 'Tasks::SelectText',
               inverse_of: :items,
               touch: true

    store_accessor :context, :question, :single_choice

    before_save :check_single
    acts_as_list scope: :task

    def functional?
      options.to_a.select(&:correct?).size >= 1 && options.size >= 2
    end

    def single_choice
      options.to_a.select(&:correct?).size == 1
    end

    private

    def check_single
      self.single_choice = options.to_a.select(&:correct?).size == 1
    end
  end
end
