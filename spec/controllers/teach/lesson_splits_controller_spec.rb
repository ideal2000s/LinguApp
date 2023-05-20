# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonSplitsController, type: :controller do
  let(:current_user) { create(:user) }

  before { sign_in(current_user) }

  describe 'POST #create' do
    subject(:response) { post :create, params: { id: lesson.id, lesson: { title: '', task_ids: [] } } }

    before do
      allow(Teach::Lessons::Cases::Split).to receive(:call).and_return(result)
      team_user
    end

    let(:team) { create(:team) }
    let(:team_user) { create(:team_user, user: current_user, team: team, default: true, role: :member) }
    let(:lesson) { create(:lesson, team: team, author: current_user) }
    let(:new_lesson) { create(:lesson, team: team, author: current_user) }
    let(:result) { instance_double('Micro::Case::Result', success?: success, value: new_lesson) }
    let(:success) { true }

    context 'with success' do
      it { is_expected.to redirect_to(teach_lesson_path(new_lesson)) }
    end

    context 'with failure' do
      let(:success) { false }

      it { is_expected.to redirect_to(teach_lesson_path(lesson)) }
    end
  end
end
