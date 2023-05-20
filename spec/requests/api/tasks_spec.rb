# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Lesson API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson, :published, language: language) }
  let(:task) { create :select_text_task, lesson: lesson }

  before do
    sign_in student, scope: :student
    get "/api/lessons/#{lesson.id}/tasks/#{task.id}"
  end

  describe 'language restricted' do
    let(:language) { create(:language, restricted: true) }

    it 'fails' do
      expect(response.status).to eq(403)
    end

    describe 'student granted license' do
      let(:plan) { create(:plan, language: language) }
      let(:team) { create(:team) }

      let(:team_student) do
        create(:team_student, team: team, student: create(:student)).tap do |team_student|
          team_student.licenses << License.new(plan: plan)
        end
      end
      let(:student) { team_student.student }

      it 'succeeds' do
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'language not restricted' do
    let(:language) { create(:language, restricted: false) }

    it 'succeeds' do
      expect(response.status).to eq(200)
    end
  end
end
