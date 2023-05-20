# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::Create do
  subject(:result) { described_class.call(user: user, params: params) }

  let(:user) { create(:user, fname: 'Jurgen', lname: 'Smirnoff') }
  let(:params) do
    { name: 'New Team', about: 'About team' }
  end

  context 'when new user signs up' do
    it 'creates new team' do
      expect { result }.to change(Team, :count).by(1)
    end

    it 'returns successful result' do
      expect(result).to be_success
    end

    it 'assigns provided team attributes' do
      res = result
      team = res.value[:team]

      expect(team).to have_attributes(name: params[:name], about: params[:about], status: 'school')
    end
  end

  context 'when existing user' do
    let(:team) { create(:team, owner: user) }

    before { team }

    it 'creates new team' do
      expect { result }.to change(Team, :count).from(1).to(2)
    end

    it 'assigns provided team attributes' do
      res = result
      team = res.value[:team]

      expect(team).to have_attributes(name: params[:name], about: params[:about], status: 'school')
    end
  end
end
