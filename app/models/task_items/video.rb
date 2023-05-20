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
  class Video < ::TaskItem
    belongs_to :task,
               class_name: 'Tasks::Video',
               inverse_of: :items,
               touch: true
    store_accessor :context, :url, :caption

    has_rich_text :caption
  end
end
