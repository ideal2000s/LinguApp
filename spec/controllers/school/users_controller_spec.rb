# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe UsersController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(UserPolicy).to receive(:new).and_return(user_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user) }
    let(:user_policy) do
      instance_double(UserPolicy, edit?: true, update?: true)
    end

    describe 'Get edit' do
      before do
        get :edit, xhr: true
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit) }
    end

    describe 'PUT update' do
      context 'with valid params' do
        before do
          allow(current_user).to receive(:update).and_return(true)
          put :update, params: { user: { fname: 'fname', lname: 'lname', email: 'email@test.com' } }, xhr: true
        end

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template(:form_submit) }
      end

      context 'with invalid params' do
        before do
          allow(current_user).to receive(:update).and_return(false)
          put :update, params: { user: { fname: 'fname', lname: 'lname', email: '' } }, xhr: true
        end

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template(:edit) }
      end
    end
  end
end
