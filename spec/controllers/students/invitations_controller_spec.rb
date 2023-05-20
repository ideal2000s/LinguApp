# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::InvitationsController, type: :controller do
  let(:student) { create(:student) }
  let(:team) { create(:team) }
  let(:language) { languages(:norwegian) }
  let(:team_group) { create(:team_group, team: team, language: language) }
  let(:team_group_id) { team_group.id.to_s }

  describe 'GET show' do
    context 'with email passed' do
      before do
        get :show, params: { team_id: team.to_gid_param, email: Faker::Internet.email, team_group_id: team_group_id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:join) }
    end

    context 'without email guest' do
      before do
        get :show, params: { team_id: team.to_gid_param, team_group_id: team_group_id }
      end

      it { is_expected.to respond_with(:found) }
      it { is_expected.to redirect_to(new_student_session_path) }
    end

    context 'without email logged in student' do
      before do
        sign_in(student, scope: :student)
        get :show, params: { team_id: team.to_gid_param, team_group_id: team_group_id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:join) }
    end
  end

  describe 'POST join' do
    let(:plan_id) { nil }
    let(:students_params) { ActionController::Parameters.new(email: email).permit! }
    let(:factory_params) do
      { current_team: team,
        students_params: students_params,
        team_group_id: team_group_id,
        plan_id: plan_id }
    end

    context 'with email passed' do
      let(:email) { Faker::Internet.email }
      let(:student_creator) { instance_double(School::StudentFactory, create: {}) }

      before do
        allow(School::StudentFactory).to receive(:new).with(factory_params).and_return(student_creator)
        post :join, params: { team_id: team.to_gid_param, email: email, team_group_id: team_group_id }, xhr: true
      end

      it { is_expected.to respond_with(:found) }
      it { is_expected.to redirect_to(root_path) }
    end

    context 'without email guest' do
      let(:students_params) { ActionController::Parameters.new.permit! }
      let(:student_creator) { instance_double(School::StudentFactory, create: { errors: ['baaad'] }) }

      before do
        allow(School::StudentFactory).to receive(:new).with(factory_params).and_return(student_creator)
        post :join, params: { team_id: team.to_gid_param, team_group_id: team_group_id }, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:join) }
    end

    context 'without email logged in student' do
      let(:students_params) { ActionController::Parameters.new.permit! }
      let(:student_creator) { instance_double(School::StudentFactory, create: {}) }

      before do
        allow(School::StudentFactory).to receive(:new).with(factory_params).and_return(student_creator)
        post :join, params: { team_id: team.to_gid_param, team_group_id: team_group_id }, xhr: true
      end

      it { is_expected.to respond_with(:found) }
      it { is_expected.to redirect_to(root_path) }
    end
  end
end
