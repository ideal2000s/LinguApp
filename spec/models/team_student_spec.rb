# frozen_string_literal: true

# == Schema Information
#
# Table name: team_students
#
#  id                :bigint           not null, primary key
#  team_id           :bigint           not null
#  student_id        :bigint           not null
#  archived_at       :datetime
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  discarded_at      :datetime
#  team_group_id     :bigint
#  active_license_id :integer
#  course_id         :integer
#
require 'rails_helper'

RSpec.describe TeamStudent, type: :model do
  describe 'Associations' do
    it { is_expected.to have_many(:licenses) }
    it { is_expected.to have_many(:plans).through(:licenses) }
    it { is_expected.to belong_to(:student) }
    it { is_expected.to belong_to(:team) }
    it { is_expected.to belong_to(:team_group).optional }
    it { is_expected.to belong_to(:active_license).optional }
  end

  describe 'Scope' do
    context 'when kept' do
      subject(:kept) { described_class.kept }

      let(:active_student) { create(:team_student) }

      it { is_expected.to include(active_student) }
    end

    context 'when discarded' do
      subject(:discarded) { described_class.discarded }

      let(:inactive_student) { create(:team_student, discarded_at: Time.zone.now) }

      it { is_expected.to include(inactive_student) }
    end
  end

  describe '#notify_about_course' do
    let(:team) { create(:team) }
    let(:team_group) { create(:team_group, team: team, course: course) }
    let(:student) { create(:student) }
    let(:team_student) { create(:team_student, team: team, student: student) }
    let(:course) { create(:course) }

    context 'when team_student is created with course assigned' do
      let(:team_student) { create(:team_student, team: team, student: student, course: course) }

      before do
        allow(School::Students::Cases::NotifyCourseAssignedToGroup).to receive(:call).and_call_original
        team_student
      end

      it 'calls notify_about_course for every student' do
        expect(
          School::Students::Cases::NotifyCourseAssignedToGroup
        ).to have_received(:call).with(team: team, student: student, course: course).once
      end
    end

    context 'when course is assigned' do
      before do
        allow(School::Students::Cases::NotifyCourseAssignedToGroup).to receive(:call).and_call_original
        team_group
        team_student
        team_student.update!(course: course)
      end

      it 'calls notify_about_course for every student' do
        expect(
          School::Students::Cases::NotifyCourseAssignedToGroup
        ).to have_received(:call).with(course: course, student: student, team: team).once
      end
    end
  end
end
