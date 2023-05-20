# frozen_string_literal: true

# == Schema Information
#
# Table name: team_invitations
#
#  id             :bigint           not null, primary key
#  team_domain_id :bigint           not null
#  user_id        :bigint           not null
#  status         :integer          default("pending")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
require 'rails_helper'

RSpec.describe TeamInvitation, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:team_domain) }
  end
end
