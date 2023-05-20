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
  class ImageHotspot < ::TaskItem
    acts_as_list scope: :task
    belongs_to :task,
               class_name: 'Tasks::ImageHotspot',
               inverse_of: :items,
               touch: true
    has_one :task_item_word,
            inverse_of: :task_item,
            foreign_key: :task_item_id,
            dependent: :destroy
    has_one :word, through: :task_item_word

    store_accessor :context, :top, :left, :width, :height

    accepts_nested_attributes_for :task_item_word

    delegate :word_class, to: :word, allow_nil: true
    delegate :id, :body, to: :word, prefix: true, allow_nil: true

    def functional?
      task_item_word.present?
    end
  end
end
