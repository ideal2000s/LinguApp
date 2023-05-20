# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teams::Cases::Update do
  subject(:result) { described_class.call(team: team, user: user, params: params, user_params: user_params) }

  let(:user) { create(:user) }
  let(:team) { create(:team) }
  let(:params) do
    { default: true }
  end
  let(:user_params) do
    { fname: Faker::Lorem.characters(number: 10), lname: Faker::Lorem.characters(number: 10) }
  end

  it 'updates the user' do
    res = result
    user = res.value[:user]

    expect(user).to have_attributes(fname: user_params[:fname], lname: user_params[:lname])
  end
end
