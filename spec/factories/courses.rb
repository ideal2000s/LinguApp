# frozen_string_literal: true

# == Schema Information
#
# Table name: courses
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  description    :string
#  image_data     :text
#  lessons_count  :integer          default(0), not null
#  rating         :float
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  discarded_at   :datetime
#  author_id      :integer
#  team_id        :integer
#  sections_count :integer          default(0)
#  language_id    :bigint
#  slug           :string
#  published      :boolean          default(FALSE), not null
#  level          :integer          default("undefined"), not null
#  meta           :jsonb            not null
#
FactoryBot.define do
  sequence(:title) { |n| "Title #{n}" }
  factory :course do
    association :author, factory: :user
    association :team
    language { Language.find(ActiveRecord::FixtureSet.identify(:norwegian)) }
    title

    trait :published do
      published { true }
    end
  end
end
