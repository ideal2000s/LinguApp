# frozen_string_literal: true

# == Schema Information
#
# Table name: lessons
#
#  id                  :bigint           not null, primary key
#  author_id           :bigint
#  title               :string
#  discarded_at        :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  objectives          :string           default([]), not null, is an Array
#  kind                :integer          default("tet"), not null
#  level               :integer          default("undefined"), not null
#  meta                :jsonb            not null
#  published           :boolean          default(FALSE), not null
#  parent_id           :integer
#  language_id         :bigint
#  support_language_id :bigint
#  status              :integer          default("draft"), not null
#  team_id             :integer
#  tags                :string           default([]), is an Array
#  image_data          :text
#  ratings_count       :integer          default(0), not null
#  total_rating        :integer          default(0), not null
#  phrases_count       :integer          default(0)
#  average_duration    :integer
#  course_section_id   :bigint
#  position            :integer          default(0), not null
#
FactoryBot.define do
  factory :lesson do
    team
    association :author, factory: :user
    sequence(:title) { |n| "lesson_#{n}" }
    language { Language.find(ActiveRecord::FixtureSet.identify(:english)) }

    trait :published do
      status { :approved }
      published { true }
    end

    trait :with_tasks do
      # TODO: Switch to before(:create) with prebuilt associations to prevent additional records creation from callbacks.
      after(:create) do |lesson|
        lesson.tasks << create(:text_task)
        lesson.tasks << create(:arrange_words_task)
      end
    end
    trait :with_one_task do
      after(:create) do |lesson|
        lesson.tasks << create(:text_task)
      end
    end
  end
end
