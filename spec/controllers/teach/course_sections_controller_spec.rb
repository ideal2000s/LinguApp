# frozen_string_literal: true

require 'rails_helper'

module Teach
  RSpec.describe CourseSectionsController, type: :controller do
    before do
      sign_in(current_user)
      allow(controller).to receive(:course_section).and_return(course_section)
    end

    let(:current_user) { create(:user, :with_default_team) }
    let(:course_section) { instance_double(CourseSection, move_higher: true, id: 1) }

    describe 'PATCH #move_up' do
      before do
        patch :move_up, params: { course_id: 1, id: course_section.id }
      end

      it { is_expected.to respond_with(200) }
    end
  end
end
