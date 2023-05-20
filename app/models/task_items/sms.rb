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
  class SMS < ::TaskItem
    acts_as_list scope: :task
    belongs_to :task,
               class_name: 'Tasks::SMS',
               inverse_of: :items,
               touch: true

    store_accessor :context, :message, :partner_name
  end
end
