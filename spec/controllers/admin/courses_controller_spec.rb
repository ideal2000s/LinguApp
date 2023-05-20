# frozen_string_literal: true

require 'rails_helper'

module Admin
  RSpec.describe CoursesController, type: :controller do
    before do
      allow(CoursePolicy).to receive(:new).and_return(course_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:course_policy) do
      instance_double(CoursePolicy,
                      index?: true,
                      show?: true,
                      words?: true,
                      level_words?: true,
                      translate_words?: true,
                      reset_phrases_count?: true)
    end
    let(:team) { create(:team) }
    let(:course) { create(:course, team: team, author: current_user) }

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

    describe 'GET words' do
      before do
        get :words, params: { id: course.id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:words) }
    end

    describe 'GET level_words' do
      before do
        get :level_words, params: { id: course.id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:level_words) }
    end

    describe 'GET translate_words' do
      before do
        get :translate_words, params: { id: course.id }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(words_admin_course_path(course)) }
    end

    describe 'GET reset_phrases_count' do
      before do
        get :reset_phrases_count, params: { id: course.id }
      end

      it { is_expected.to respond_with(302) }
      it { is_expected.to redirect_to(admin_courses_path) }
    end
  end
end
