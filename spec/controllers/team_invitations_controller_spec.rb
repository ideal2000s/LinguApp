# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TeamInvitationsController, type: :controller do
  before do
    sign_in(current_user)
  end

  let(:current_user) { create(:user) }
  let(:team) { create(:team) }

  describe 'GET #show' do
    before do
      get :show, params: { team_id: team_id }
    end

    context 'when correct team gid parameter in a URL' do
      let(:team_id) { team.to_gid_param }

      it { is_expected.to respond_with(200) }
      it { is_expected.to render_template(:show) }

      it 'does not assign alert flash message' do
        expect(flash[:alert]).to be_blank
      end
    end

    context 'when team is not found' do
      let(:team_id) { 'bad' }

      it { is_expected.to respond_with(200) }
      it { is_expected.to render_template(:show) }

      it 'assigns alert flash message' do
        expect(flash[:alert]).to eql(I18n.t('team_invitations.show.team_not_found'))
      end
    end
  end
end
