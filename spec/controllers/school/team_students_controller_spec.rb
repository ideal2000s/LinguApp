# frozen_string_literal: true

require 'rails_helper'

module School # rubocop:disable Metrics/ModuleLength
  RSpec.describe TeamStudentsController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:team_group).and_return(team_group)
      allow(controller).to receive(:student).and_return(student)
      allow(StudentPolicy).to receive(:new).and_return(student_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: DateTime.now) }
    let(:language) { create(:language) }
    let(:team_group) { create(:team_group, team: current_team, language: language) }
    let(:student) { create(:student) }
    let(:team_student) { create(:team_student, team: current_team, student: student) }
    let(:lesson) { create(:lesson, team: current_team) }
    let(:lesson_session) { create(:lesson_session, student: student, lesson: lesson) }
    let(:student_policy) do
      instance_double(StudentPolicy,
                      assign_team_group?: true,
                      index?: true,
                      edit?: true,
                      show?: true,
                      new?: true,
                      create?: true,
                      import_students?: true,
                      analyze_imported_file?: true,
                      create_batch?: true,
                      revoke_team_group?: true,
                      archived_students?: true,
                      clear_archive?: true,
                      restore_student?: true,
                      remove_student?: true,
                      invite_students?: true,
                      send_invitations?: true,
                      assign_course?: true)
    end

    describe 'GET index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:index) }
    end

    describe 'GET show' do
      before do
        lesson_session
        team_student
        get :show, params: { id: student.id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:lessons) }
    end

    describe 'POST create' do
      before do
        post :create, params: {
          student: { email: Faker::Internet.email, fname: Faker::Name.first_name, lname: Faker::Name.last_name }
        }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:form_submit) }
    end

    describe 'GET new' do
      before do
        get :new, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:new) }
    end

    describe 'GET edit' do
      before do
        get :edit, params: { id: student.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit) }
    end

    describe 'POST update' do
      before do
        post :create, params: {
          student: { email: Faker::Internet.email, fname: Faker::Name.first_name, lname: Faker::Name.last_name }
        }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
    end

    describe 'GET import_students' do
      before do
        get :import_students, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:import_students) }
    end

    describe 'POST analyze_imported_file' do
      before do
        allow(School::ImportFileAnalyzer).to receive(:new).and_return(students_file_analyzer)
        post :analyze_imported_file, params: { file: {} }, xhr: true
      end

      let(:students_file_analyzer) { instance_double(School::ImportFileAnalyzer, analyze: { file_name: '', students: [] }) }

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:analyze_imported_file) }
    end

    describe 'POST create_batch' do
      before do
        allow(School::StudentFactory).to receive(:create_batch).and_return({ imported_students_count: 0 })
        post :create_batch, params: { students: [] }, xhr: true
      end

      let(:students_importer) { instance_double(School::StudentFactory) }

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_students_path) }
    end

    describe 'POST assign_team_group' do
      before do
        team_student
        post :assign_team_group, params: { id: student.id, team_group_id: team_group.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:assign_team_group) }
    end

    describe 'DELETE revoke_team_group' do
      before do
        team_student
        delete :revoke_team_group, params: { id: student.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:revoke_team_group) }
    end

    describe 'GET archived_students' do
      before do
        team_student
        get :archived_students
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:archived_students) }
    end

    describe 'GET clear_archive' do
      before do
        team_student
        get :clear_archive, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:clear_archive) }
    end

    describe 'GET restore_student' do
      before do
        team_student
        get :restore_student, params: { id: student.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:restore_student) }
    end

    describe 'GET remove_student' do
      before do
        team_student
        get :remove_student, params: { id: student.id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:remove_student) }
    end

    describe 'GET invite_students' do
      before do
        get :invite_students, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:invite_students) }
    end

    describe 'GET send_invitations' do
      before do
        get :send_invitations, params: { invitee_emails: [] }, xhr: true
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(school_students_path) }
    end

    describe 'POST assign_course' do
      subject(:request) { post :assign_course, params: params }

      before do
        team_student
      end

      let(:course) { create(:course, :published, team: current_team) }

      context 'with correct params' do
        let(:params) { { id: student.id, course_id: course.id, format: :js } }

        it 'responds with 200' do
          request
          expect(response.status).to eq(200)
        end

        it 'assigns course to a team_group' do
          expect { request }.to change(course.team_students, :count).by(1)
        end
      end

      context 'with non-existing course_id' do
        let(:params) { { id: student.id, course_id: 0, format: :js } }

        it 'catches an error' do
          request
          expect(flash.now[:alert]).to eq(I18n.t('school.team_groups.errors.course_not_selected'))
        end
      end
    end
  end
end
