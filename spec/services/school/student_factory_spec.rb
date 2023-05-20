# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe StudentFactory, type: :service do
    subject(:imported_students_result) do
      described_class.create_batch(current_user: current_user,
                                   current_team: current_team,
                                   students_params: param_students,
                                   team_group_id: team_group.id,
                                   plan_id: plan.id)
    end

    let(:current_user) { create(:user) }
    let(:current_team) { create(:team) }
    let(:team_group) { create(:team_group, team: current_team) }
    let(:plan) { create(:plan) }
    let(:param_students) do
      [
        { 'fname' => 'Student', 'lname' => '#1',
          'email' => 'student1@test.com',
          'valid' => 'true' },
        { 'fname' => 'Student',
          'lname' => '#2',
          'email' => 'student2@test.com',
          'valid' => 'true' },
        { 'fname' => 'Student',
          'lname' => '#3',
          'email' => 'student3@test.com',
          'valid' => 'true' }
      ]
    end

    it 'creates 3 students' do
      expect { imported_students_result }.to change(Student, :count).by(3)
    end

    it 'creates 3 team students' do
      expect { imported_students_result }.to change(TeamStudent, :count).by(3)
    end

    it 'creates 3 licenses' do
      expect { imported_students_result }.to change(License, :count).by(3)
    end

    describe '#create' do
      subject(:create_student_result) do
        described_class.create(current_user: current_user,
                               current_team: current_team,
                               students_params: param_students[0],
                               team_group_id: team_group.id,
                               plan_id: plan.id)
      end

      it 'creates student' do
        expect { create_student_result }.to change(Student, :count).by(1)
      end

      it 'creates team student' do
        expect { create_student_result }.to change(TeamStudent, :count).by(1)
      end
    end
  end
end
