# frozen_string_literal: true

# == Schema Information
#
# Table name: oauth_apps
#
#  id            :uuid             not null, primary key
#  name          :string           not null
#  secret        :string           not null
#  redirect_uris :string           default([]), not null, is an Array
#  team_id       :integer
#  client_data   :jsonb            not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'rails_helper'

module OAuth
  RSpec.describe App, type: :model do
    describe 'Associations' do
      it { is_expected.to belong_to(:team) }
    end

    describe '#get_secret' do
      let(:team) { create(:team) }
      let(:app) { create(:oauth_app, team: team) }

      it 'returns secret code' do
        expect(app.secret_code.length).to eq(86)
      end
    end
  end
end
