# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe CourseSectionsController, type: :controller do
    before do
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(CourseSectionPolicy).to receive(:new).and_return(course_section_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: DateTime.now) }
    let(:course) { create(:course, :published, team: current_team) }
    let(:course_section) { create(:course_section, course: course) }
    let(:course_section_policy) do
      instance_double(CourseSectionPolicy,
                      show?: true,
                      change_view_mode?: true)
    end

    describe 'GET show' do
      before do
        get :show, params: { course_id: course.id, id: course_section.id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:show) }
    end

    describe 'GET change_view_mode' do
      before do
        get :change_view_mode, params: { course_id: course.id, id: course_section.id }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:show) }
    end
  end
end
