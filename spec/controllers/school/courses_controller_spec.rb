# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe CoursesController, type: :controller do
    before do
      allow(Team).to receive(:current).and_return(current_team)
      allow(CoursePolicy).to receive(:new).and_return(student_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: DateTime.now) }
    let(:student_policy) do
      instance_double(CoursePolicy,
                      assign_team_group?: true,
                      index?: true,
                      show?: true)
    end
    let(:team_group) { create(:team_group, team: current_team) }
    let(:course) { create(:course, :published, team: current_team) }

    describe 'GET index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end

    describe 'GET show' do
      before do
        get :show, params: { id: course.id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:show) }
    end

    describe 'POST assign_team_group' do
      subject(:request) { post :assign_team_group, params: params }

      context 'with correct params' do
        let(:params) { { id: course.id, course: { team_group_ids: [team_group.id] }, format: :js } }

        it 'responds with 200' do
          request
          expect(response.status).to eq(200)
        end

        it 'assigns course to a team_group' do
          expect { request }.to change(course.team_groups, :count).by(1)
        end
      end

      context 'with non-existing team_group_id' do
        let(:params) { { id: course.id, team_group_id: 10 } }

        it 'raises error' do
          expect { request }.to(raise_error { ActiveRecord::RecordNotFound })
        end
      end
    end
  end
end
