# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint           not null, primary key
#  name               :string
#  type               :string           not null
#  introduction       :text
#  complexity         :integer          default("low")
#  performance        :float
#  ordered_solution   :boolean          default(FALSE)
#  discarded_at       :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  context            :jsonb            not null
#  published          :boolean          default(TRUE), not null
#  score_method       :integer          default("fractional"), not null
#  snapshot           :boolean          default(FALSE), not null
#  snapshot_timestamp :datetime
#  parent_id          :integer
#  subject            :integer          default("teach"), not null
#  rank               :integer          default(0)
#  lesson_id          :integer
#  position           :integer
#

FactoryBot.define do
  trait :task do
    lesson
    name { "Task #{Faker::Lorem.sentence(word_count: 3)}" }
    type { 'Tasks::SelectText' }
    introduction { 'Task Introduction' }
    complexity { Task.complexities.keys.first }
    performance { 0.5 }
    published { true }
    discarded_at { nil }
    subject { 'teach' }

    trait :unpublished do
      published { false }
    end
  end

  trait :with_snapshot do
    after(:create) do |task|
      Tasks::SnapshotBuilder.create!(task: task)
    end
  end
end
