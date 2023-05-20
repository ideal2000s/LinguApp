# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id               :bigint           not null, primary key
#  name             :string
#  type             :string           not null
#  instruction      :text
#  introduction     :text
#  complexity       :integer          default("low")
#  performance      :float
#  ordered_solution :boolean          default(FALSE)
#  manual_check     :boolean          default(FALSE)
#  discarded_at     :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  title            :string           default(""), not null
#  context          :jsonb            not null
#  published        :boolean          default(FALSE), not null
#

FactoryBot.define do
  factory :audio_dialogue_item, parent: :task_item, class: 'TaskItems::AudioDialogue'
end
