# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::RewardsController, type: :controller do
  before { sign_in(current_user) }

  let(:current_user) { create(:user, :with_admin_role) }

  let(:language) { create(:language) }
  let(:attributes) do
    {
      name: Faker::Lorem.characters(number: 10),
      language_id: language.id,
      value: 3,
      kind: 'badge',
      dimension: 'word',
      description: Faker::Lorem.sentence(word_count: 5)
    }
  end

  describe 'GET /index' do
    it 'renders index template in admin layout' do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'GET /new' do
    it 'renders new template in admin layout' do
      get :new
      expect(response).to render_template('new')
    end
  end

  describe 'GET /edit' do
    before do
      allow(Reward).to receive(:find).and_return(reward_instance)
      get :edit, params: { id: reward_instance.id }
    end

    let(:reward_instance) { instance_double(Reward, id: 5) }

    it { is_expected.to respond_with(:ok) }
    it { is_expected.to render_template(:edit) }
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Reward' do
        expect do
          post(:create, params: { reward: attributes })
        end.to change(Reward, :count).by(1)
      end

      it 'redirects to the created Reward' do
        post :create, params: { reward: attributes }
        reward = Reward.last
        expect(response).to redirect_to(edit_admin_reward_path(reward.id))
      end
    end

    context 'with invalid parameters' do
      before do
        allow(Reward).to receive(:new).and_return(reward_instance)
        allow(reward_instance).to receive(:save).and_return(false)
      end

      let(:reward_instance) { instance_double(Reward) }

      it 'does not create a new Reward' do
        expect do
          post(:create, params: { reward: attributes })
        end.to change(Reward, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post :create, params: { reward: attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:reward) { create(:reward, language: language) }

      it 'redirects to the reward' do
        patch :update, params: { id: reward.id, reward: attributes }
        expect(response).to redirect_to(edit_admin_reward_url(reward, notice: I18n.t('admin.rewards.form.update_success')))
      end
    end

    context 'with invalid parameters' do
      before do
        allow(Reward).to receive(:find).and_return(reward_instance)
        allow(reward_instance).to receive(:update).and_return(false)
      end

      let(:reward_instance) { instance_double(Reward, id: 5) }

      it "renders a successful response (i.e. to display the 'edit' template)" do
        patch :update, params: { id: reward_instance.id, reward: attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE /destroy' do
    before do
      allow(Reward).to receive(:find).and_return(reward_instance)
      allow(reward_instance).to receive(:discard)
    end

    let(:reward_instance) { instance_double(Reward, id: 5) }

    it 'discards the reward' do
      delete :destroy, params: { id: reward_instance.id }
      expect(reward_instance).to have_received(:discard)
    end

    it 'redirects to the rewards list' do
      delete :destroy, params: { id: reward_instance.id }
      expect(response).to redirect_to(admin_rewards_url)
    end
  end

  describe 'GET /show' do
    before do
      allow(Reward).to receive(:find).and_return(reward_instance)
      get :show, params: { id: reward_instance.id }
    end

    let(:reward_instance) { instance_double(Reward, id: 5) }

    it { is_expected.to respond_with(:ok) }
    it { is_expected.to render_template(:show) }
  end
end
