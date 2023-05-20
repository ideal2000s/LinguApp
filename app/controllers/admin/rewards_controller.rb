# frozen_string_literal: true

module Admin
  class RewardsController < ApplicationController
    before_action :authorize_action, except: %i[index new create]

    def index
      authorize_action(Reward)

      render :index, locals: {
        rewards: scope.page(params[:page])
      }
    end

    def create
      authorize_action(Reward)

      reward = Reward.new(reward_params)
      if reward.save
        redirect_to edit_admin_reward_path(reward.id)
      else
        render :new, locals: { reward: reward }
      end
    end

    def new
      authorize_action(Reward)

      reward = Reward.new
      render :new, locals: { reward: reward }
    end

    def edit
      render :edit, locals: { reward: reward }
    end

    def update
      if reward.update(reward_params)
        redirect_to action: :edit, notice: I18n.t('admin.rewards.form.update_success')
      else
        render :edit, locals: { reward: reward }
      end
    end

    def show
      render :show, locals: { reward: reward }
    end

    def destroy
      reward.discard
      redirect_to admin_rewards_path, notice: I18n.t('admin.discard_msg')
    end

    private

    def reward
      @reward ||= Reward.find(params[:id])
    end

    def reward_params
      params.require(:reward).permit(:language_id, :name, :description, :value, :kind, :dimension, :image)
    end

    def authorize_action(record = reward)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::RewardPolicy
    end

    def scope
      policy_scope(Reward, policy_scope_class: Admin::RewardPolicy::Scope)
    end
  end
end
