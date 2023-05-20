# frozen_string_literal: true

require 'rails_helper'
module School
  RSpec.describe TeamPresenter, type: :presenter do
    describe 'Methods' do
      subject(:presenter) { described_class.new(team) }

      let!(:team) { create(:team) }
      let!(:team_student) { create(:team_student, team: team, student: student) }
      let!(:team_student2) { create(:team_student, team: team, student: student2) }
      let!(:lesson_session1) { create(:lesson_session, student: student, lesson: lesson2, duration: 1) }
      let!(:lesson_session2) { create(:lesson_session, student: student2, lesson: lesson1, duration: 1) }
      let!(:lesson_session3) { create(:lesson_session, student: student2, lesson: lesson2, duration: 1) }
      let(:student) { create(:student) }
      let(:student2) { create(:student) }
      let(:student_target_language) { create(:student_target_language, student: student, level: 10) }
      let(:lesson1) { create(:lesson, team: team) }
      let(:lesson2) { create(:lesson, team: team) }
      let(:game_play) { create(:gameplay, student: student) }
      let(:game_play2) { create(:gameplay, student: student2) }

      it 'returns total_time_spent' do
        lesson_session1.update(duration: 120)
        lesson_session2.update(duration: 150)
        lesson_session3.update(duration: 60)
        expect(presenter.total_time_spent).to eq('5m 30s')
      end

      it 'returns students_by_level' do
        student.update(active_student_target_language_id: student_target_language.id)
        student_with_a1_level = presenter.students_by_level.select { |obj| obj[:level] == 'a1' }.first
        expect(student_with_a1_level[:count]).to eq(1)
      end

      it 'returns top_lessons' do
        lesson_session1
        lesson_session2
        lesson_session3
        expect(presenter.top_lessons.first.lesson_id).to be(lesson2.id)
      end

      it 'returns top_score_students' do
        expect(presenter.top_score_students.first.id).to eq(student2.id)
      end

      it 'returns inactive_students' do
        team_student.update(active_license_id: nil)
        team_student2.update(active_license_id: nil)
        expect(presenter.inactive_students.count).to eq(2)
      end
    end
  end
end
