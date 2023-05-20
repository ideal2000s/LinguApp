# frozen_string_literal: true

require 'rails_helper'

module School
  module Students
    RSpec.describe Cases::CreateOrUpdate do
      let(:current_team) { create(:team, owner: current_user) }
      let(:current_user) { create(:user) }

      describe '#success' do
        subject(:result) do
          described_class.call(current_user: current_user,
                               current_team: current_team,
                               scope: current_team.students,
                               student_params: valid_params['student'],
                               params: valid_params)
        end

        let(:valid_params) do
          {
            'student' => { 'fname' => 'Student', 'lname' => '#1', :email => 'student#1@test.com' }
          }
        end

        it 'creates student' do
          expect { result }.to change(Student, :count).by(1)
        end
      end

      describe '#failed' do
        subject(:result) do
          described_class.call(current_user: current_user,
                               current_team: current_team,
                               scope: current_team.students,
                               student_params: invalid_params['student'],
                               params: invalid_params)
        end

        let(:invalid_params) do
          {
            'student' => { 'fname' => 'Student', 'lname' => '' }
          }
        end

        it 'returns error' do
          expect { result }.to change(Student, :count).by(0)
        end
      end
    end
  end
end
