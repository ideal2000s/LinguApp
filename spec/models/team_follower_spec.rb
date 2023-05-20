# frozen_string_literal: true

# == Schema Information
#
# Table name: team_followers
#
#  id         :bigint           not null, primary key
#  team_id    :bigint           not null
#  student_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe TeamFollower, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:student) }
    it { is_expected.to belong_to(:team) }
  end
end
