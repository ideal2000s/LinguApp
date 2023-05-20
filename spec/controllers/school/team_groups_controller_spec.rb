# frozen_string_literal: true

require 'rails_helper'

module School # rubocop:disable Metrics/ModuleLength
  RSpec.describe TeamGroupsController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:team_group).and_return(team_group)
      allow(TeamGroupPolicy).to receive(:new).and_return(team_group_policy)
      sign_in(current_user)
    end

    let(:language) { create(:language) }
    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:team_group) do
      instance_double(TeamGroup,
                      id: 1,
                      students: [],
                      language_id: 1,
                      language: language,
                      level: :a1,
                      update: true,
                      archive_group: true,
                      discard: true)
    end
    let(:team_student) { instance_double(TeamStudent, id: 1, update!: true) }
    let(:plan) { create(:plan) }
    let(:team_group_policy) do
      instance_double(
        TeamGroupPolicy,
        index?: true,
        assign_course?: true,
        create?: true,
        edit?: true,
        new?: true,
        update?: true,
        destroy?: true,
        archive?: true,
        edit_plan?: true,
        update_plan?: true
      )
    end

    describe 'GET index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end

    describe 'POST create' do
      before do
        team_student
        post :create, params: {
          team_group: { name: Faker::Name.first_name, language_id: language.id, level: 'undefined' }
        }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_team_groups_path) }
    end

    describe 'GET edit' do
      before do
        get :edit, params: { id: team_group.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit) }
    end

    describe 'GET new' do
      before do
        get :new, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:new) }
    end

    describe 'PUT update' do
      before do
        put :update, params: {
          id: team_group.id,
          team_group: { name: Faker::Name.first_name, language_id: language.id, level: 'undefined' }
        }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:update) }
    end

    describe 'DELETE destroy' do
      before do
        delete :destroy, params: { id: team_group.id }, xhr: true
      end

      it { is_expected.to redirect_to(school_students_path) }
    end

    describe 'PUT archive' do
      before do
        put :archive, params: { id: team_group.id }, xhr: true
      end

      it { is_expected.to redirect_to(school_team_groups_path) }
    end

    describe 'GET edit_plan' do
      before do
        get :edit_plan, params: { id: team_group.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit_plan) }
    end

    describe 'PUT update_plan' do
      context 'with correct params' do
        before do
          allow(School::AddPlanTeamGroupService).to receive(:new).and_return(add_plan_team_group_service)
          put :update_plan, params: params
        end

        let(:add_plan_team_group_service) { instance_double(School::AddPlanTeamGroupService) }
        let(:params) do
          { id: team_group.id, plan_id: plan.id }
        end

        it { is_expected.to respond_with(302) }
        it { is_expected.to redirect_to(school_team_groups_path) }

        it 'assigns an expected flash message' do
          expect(flash[:notice]).to eql(I18n.t('school.team_students.profile.license_in_progress'))
        end
      end

      context 'with incorrect params' do
        before do
          put :update_plan, params: params
        end

        let(:params) do
          { id: team_group.id, plan_id: '' }
        end

        it { is_expected.to respond_with(302) }
        it { is_expected.to redirect_to(school_team_groups_path) }

        it 'assigns an expected flash message' do
          expect(flash[:alert]).to eql(I18n.t('school.team_students.profile.plan_is_not_selected'))
        end
      end
    end

    describe 'POST assign_course' do
      subject(:request) { post :assign_course, params: params }

      let(:course) { create(:course, :published, team: current_team) }
      let(:team_group) { create(:team_group, team: current_team) }

      context 'with correct params' do
        let(:params) { { id: team_group.id, course_id: course.id, format: :js } }

        it 'responds with 200' do
          request
          expect(response.status).to eq(200)
        end

        it 'assigns course to a team_group' do
          expect { request }.to change(course.team_groups, :count).by(1)
        end
      end

      context 'with non-existing course_id' do
        let(:params) { { id: team_group.id, course_id: 0 } }

        it 'catches an error' do
          request
          expect(flash.now[:alert]).to eq(I18n.t('school.team_groups.errors.course_not_selected'))
        end
      end
    end
  end
end
