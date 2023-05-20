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
  class FillInTable < ::TaskItem
    include AudioUploader::Attachment(:audio)

    belongs_to :task,
               class_name: 'Tasks::FillInTable',
               inverse_of: :items,
               touch: true

    has_many :options,
             -> { order(:id) },
             class_name: 'TaskItemOptions::FillInTable',
             foreign_key: :task_item_id,
             inverse_of: :item,
             dependent: :destroy

    store_accessor :context, :question, :audio_data
    validates :question, presence: true, if: ->(item) { item.audio.blank? }
    validates :audio, presence: true, if: ->(item) { item.question.blank? }
    accepts_nested_attributes_for :options
    acts_as_list scope: :task

    def self.params_schema
      [:audio, :question, { options_attributes: :answer }]
    end
  end
end
