# frozen_string_literal: true

# == Schema Information
#
# Table name: task_sessions
#
#  id                :bigint           not null, primary key
#  task_id           :bigint
#  lesson_session_id :bigint
#  status            :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  type              :string
#  duration          :integer
#
FactoryBot.define do
  factory :task_session do
    lesson_session
    association :task, factory: :text_task

    status { :active }
  end
end
