# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::SetDefault do
  subject(:result) { described_class.call(user: user, team: team) }

  let(:user) { create(:user, fname: 'Jurgen', lname: 'Smirnoff') }
  let(:team) { create(:team) }
  let(:team_user) { create(:team_user, user: user, team: team) }

  context 'when new user signs up' do
    before { team_user }

    it 'creates new team' do
      expect { result }.to change(user, :default_team_user).to(team_user)
    end

    it 'returns successful result' do
      expect(result).to be_success
    end
  end
end
