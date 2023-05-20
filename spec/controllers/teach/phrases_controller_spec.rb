# frozen_string_literal: true

require 'rails_helper'

module Teach
  RSpec.describe PhrasesController, type: :controller do
    let(:current_user) { create(:user) }
    let(:team) { create(:team) }
    let(:team_user) { create(:team_user, user: current_user, team: team, default: true, role: :member) }

    before do
      team_user
      sign_in(current_user)
    end

    describe 'DELETE #destroy_batch' do
      subject(:destroy_all_request) do
        request.headers['ACCEPT'] = 'application/javascript'
        delete :destroy_batch, params: { lesson_id: lesson.id }
      end

      let(:lesson) { create(:lesson, team: team, author: current_user) }

      it { is_expected.to render_template(:destroy) }
    end
  end
end
