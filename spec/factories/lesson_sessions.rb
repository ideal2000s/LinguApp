# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_sessions
#
#  id                      :bigint           not null, primary key
#  lesson_id               :bigint
#  student_id              :bigint
#  current_task_session_id :bigint
#  status                  :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  progress                :jsonb
#  duration                :integer
#
FactoryBot.define do
  factory :lesson_session do
    lesson
    student
    status { :active }

    trait :with_task_session do
      after(:create) do |session|
        task_session = create(:task_session, lesson_session: session, task: session.lesson.tasks.first)
        session.update(current_task_session: task_session)
      end
    end
  end
end
