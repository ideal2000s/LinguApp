# frozen_string_literal: true

# == Schema Information
#
# Table name: licenses
#
#  id              :bigint           not null, primary key
#  team_student_id :bigint           not null
#  plan_id         :bigint           not null
#  expires_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe License, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:plan) }
    it { is_expected.to belong_to(:team_student) }
  end

  describe '.create' do
    let(:license) { create(:license) }

    it 'updates active license' do
      expect(license.team_student.active_license).to eq(license)
    end

    describe 'once new license created' do
      let(:team_student) { license.team_student }

      it 'is revokes previous' do
        expect do
          create(:license, team_student: team_student)
        end.to change(license, 'expires_at')
      end
    end
  end

  describe '#revoke' do
    let(:license) { create(:license) }

    it 'updates expires_at' do
      expect { license.revoke }.to change(license, 'expires_at')
    end

    it 'updates active license' do
      expect do
        license.revoke
      end.to change(license.team_student, 'active_license').to(nil)
    end
  end

  describe '#expiration_date' do
    subject(:license) do
      build(:license,
            expiration_date: expiration_date,
            team_student: team_student,
            plan: plan,
            expires_at: Time.zone.today.next_day)
    end

    let(:team_student) { create(:team_student) }
    let(:plan) { create(:plan) }

    before { license.validate }

    context 'when nil' do
      let(:expiration_date) { nil }

      it { is_expected.to be_valid }
      it { expect(license.expires_at).not_to be_nil }
    end

    context 'when valid' do
      let(:date) { Time.zone.today }
      let(:expiration_date) { date.to_s }

      it { is_expected.to be_valid }
      it { expect(license.expires_at).to eq(date.end_of_day) }
    end

    context 'when invalid' do
      let(:expiration_date) { 'foo' }

      it { is_expected.to be_invalid }
      it { expect(license.errors[:expiration_date]).to include('invalid') }
    end

    context 'when past' do
      let(:date) { Date.yesterday }
      let(:expiration_date) { date.to_s }

      it { is_expected.to be_valid }
    end
  end
end
