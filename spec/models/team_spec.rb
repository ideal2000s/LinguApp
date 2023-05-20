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
require 'rails_helper'

RSpec.describe Team, type: :model do
  subject(:team) { described_class.new(status: status, owner: owner) }

  let(:owner) { build_stubbed(:user) }
  let(:status) { :personal }

  describe 'Associations' do
    it { is_expected.to belong_to(:default_language).optional }
    it { is_expected.to belong_to(:owner) }
    it { is_expected.to have_many(:team_users) }
    it { is_expected.to have_many(:team_groups) }
    it { is_expected.to have_many(:users).through(:team_users) }
  end

  context 'when school' do
    let(:status) { :school }

    it { is_expected.to validate_presence_of(:name) }
  end

  context 'when personal' do
    it { is_expected.not_to validate_presence_of(:name) }
  end
end
