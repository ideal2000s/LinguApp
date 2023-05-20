# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe TeamUserFactory, type: :service do
    subject(:imported_users_result) { described_class.create_batch(current_team: current_team, users_params: param_users) }

    let(:current_team) { create(:team) }
    let(:param_users) do
      [
        { 'fname' => 'User',
          'lname' => '#1',
          'email' => 'user1@test.com',
          'valid' => 'true',
          'language_data' => 'en' },
        { 'fname' => 'User',
          'lname' => '#2',
          'email' => 'user2@test.com',
          'valid' => 'true',
          'language_data' => 'Danish' },
        { 'fname' => 'User',
          'lname' => '#3',
          'email' => 'user3@test.com',
          'valid' => 'true',
          'language_data' => 'Norsk' }
      ]
    end

    it 'creates 4 users' do
      expect { imported_users_result }.to change(User, :count).by(4)
    end

    it 'creates 4 team users' do
      expect { imported_users_result }.to change(TeamUser, :count).by(4)
    end

    it 'returns language_id from code' do
      imported_users_result
      expect(UserLanguage.where(language_id: Language.find_by(code: 'en').id).count).to eq(1)
    end

    it 'returns language_id from system_name' do
      imported_users_result
      expect(UserLanguage.where(language_id: Language.where(system_name: 'Danish').first.id).count).to eq(1)
    end

    it 'returns language_id from name_translations' do
      imported_users_result
      expect(UserLanguage.where(language_id: Language.where("name_translations->>'nb' = ?", 'Norsk').first.id).count).to eq(1)
    end
  end
end
