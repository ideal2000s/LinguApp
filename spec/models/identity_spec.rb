# frozen_string_literal: true

# == Schema Information
#
# Table name: identities
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  uid        :string
#  provider   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Identity, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end
