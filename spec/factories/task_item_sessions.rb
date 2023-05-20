# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_sessions
#
#  id              :bigint           not null, primary key
#  task_session_id :bigint
#  task_item_id    :bigint
#  data            :jsonb
#  answer          :jsonb
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  completed       :boolean          default(FALSE)
#  attempts_count  :integer          default(0), not null
#  type            :string           not null
#  correct         :boolean
#
FactoryBot.define do
  factory :task_item_session do
    after(:build) do |task_item_session|
      task_item_session.type = "#{task_item_session.task_session.task.type}::TaskItemSession"
    end
  end
end
