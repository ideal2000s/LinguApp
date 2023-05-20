# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::CreateDefault do
  subject(:result) { described_class.call(user: user) }

  let(:user) { create(:user, fname: 'Jurgen', lname: 'Smirnoff') }

  context 'when new user signs up' do
    it 'creates new team' do
      expect { result }.to change(Team, :count).by(1)
    end

    it 'returns successful result' do
      expect(result).to be_success
    end

    it 'assigns default team name' do
      res = result
      team = res.value[:team]

      expect(team).to have_attributes(name: 'Jurgen Smirnoff',
                                      status: 'personal')
    end
  end

  context 'when existing user' do
    let(:team) { create(:team, owner: user) }

    before { team }

    it 'does not create new team' do
      expect { result }.not_to change(Team, :count)
    end

    it 'finds existing team' do
      result
      expect(Team.last).to eq(team)
    end
  end
end
