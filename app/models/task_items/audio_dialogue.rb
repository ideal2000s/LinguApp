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
  class AudioDialogue < ::TaskItem
    include AudioUploader::Attachment(:audio)

    belongs_to :task,
               class_name: 'Tasks::AudioDialogue',
               inverse_of: :items,
               touch: true

    store_accessor :context, :partner_name, :audio_data
    acts_as_list scope: :task
  end
end
