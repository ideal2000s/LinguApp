# frozen_string_literal: true

# == Schema Information
#
# Table name: plans
#
#  id                :bigint           not null, primary key
#  language_id       :bigint           not null
#  system_name       :string
#  name_translations :jsonb            not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  price_cents       :integer          not null
#  price_currency    :string           not null
#  plan_interval     :integer          not null
#
require 'rails_helper'

RSpec.describe Plan, type: :model do
  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:language) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
    it { is_expected.to validate_inclusion_of(:price_currency).in_array(Plan::CURRENCIES) }
    it { is_expected.to validate_presence_of(:plan_interval) }
  end

  describe 'Associations' do
    it { is_expected.to have_many(:licenses) }
    it { is_expected.to have_many(:team_students).through(:licenses) }
    it { is_expected.to belong_to(:language) }
  end
end
