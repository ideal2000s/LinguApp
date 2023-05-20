# frozen_string_literal: true

# == Schema Information
#
# Table name: team_domains
#
#  id         :bigint           not null, primary key
#  team_id    :bigint           not null
#  domain     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe TeamDomain, type: :model do
  it { is_expected.to belong_to(:team) }

  describe 'Validations' do
    it 'invalid domain' do
      team_domain = build(:team_domain, domain: '$%invalid:domain', team_id: 1)
      team_domain.valid?

      expect(team_domain.errors[:domain]).to be_present
    end

    it 'valid domain' do
      team_domain = build(:team_domain, domain: 'example.com', team_id: 1)
      team_domain.valid?

      expect(team_domain.errors[:domain]).to be_blank
    end
  end
end
