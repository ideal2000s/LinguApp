# frozen_string_literal: true

# == Schema Information
#
# Table name: teams
#
#  id                       :bigint           not null, primary key
#  name                     :string
#  owner_id                 :bigint
#  status                   :integer          default("personal")
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  discarded_at             :datetime
#  image_data               :text
#  followers_count          :integer          default(0)
#  lessons_count            :integer          default(0), not null
#  meta                     :jsonb            not null
#  abilities                :string           default([]), is an Array
#  active_students_count    :integer          default(0)
#  gdpr_consent_at          :datetime
#  default_language_id      :bigint
#  business_registration_id :string
#  lingutest_enabled        :boolean          default(FALSE), not null
#  hubspotid                :string
#
FactoryBot.define do
  factory :team do
    association :owner, factory: :user
    sequence(:name) { |n| "Team_#{n}" }
    status { :personal }
    abilities { ['authoring'] }

    trait :school do
      status { :school }
    end

    after(:create) do |team, evaluator|
      create(:team_user, team: team, user: evaluator.owner, default: true)
    end
  end
end
