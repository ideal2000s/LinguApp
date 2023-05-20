# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student teams API', type: :request do
  before do
    sign_in(current_student, scope: :student)
  end

  let(:current_student) { create(:student) }
  let(:team) { create(:team) }
  let(:team_id) { team.id }

  describe 'GET #show' do
    before do
      get "/api/teams/#{team_id}/"
    end

    context 'when found' do
      it { expect(response.status).to eq(200) }

      it do
        expect(json.team).to have_attributes(
          id: team.id,
          followers_count: team.followers_count,
          name: team.name
        )
      end
    end

    context 'when not found' do
      let(:team_id) { 123 }

      it { expect(response.status).to eq(404) }
    end
  end

  describe 'PATCH #follow' do
    let(:success?) { true }
    let(:value) { nil }
    let(:case_result) { OpenStruct.new(success?: success?, value: value) }

    before do
      allow(Teams::Cases::Follow).to receive(:call).and_return(case_result)
      patch "/api/teams/#{team_id}/follow"
    end

    context 'when successfull' do
      it { expect(response.status).to eq(200) }
    end

    context 'when unsuccessfull' do
      let(:success?) { false }
      let(:value) { 'Some errror' }

      it { expect(response.status).to eq(200) }
      it { expect(json.error).to eq(value) }
    end
  end

  describe 'PATCH #unfollow' do
    let(:success?) { true }
    let(:value) { nil }
    let(:case_result) { OpenStruct.new(success?: success?, value: value) }

    before do
      allow(Teams::Cases::Unfollow).to receive(:call).and_return(case_result)
      patch "/api/teams/#{team_id}/unfollow"
    end

    context 'when successfull' do
      it { expect(response.status).to eq(200) }
    end

    context 'when unsuccessfull' do
      let(:success?) { false }
      let(:value) { 'Some error' }

      it { expect(response.status).to eq(200) }
      it { expect(json.error).to eq(value) }
    end
  end
end
