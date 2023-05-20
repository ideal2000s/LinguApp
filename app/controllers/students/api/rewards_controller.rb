# frozen_string_literal: true

module Students::API
  class RewardsController < ApplicationController
    def index
      render :index, locals: {
        rewards: reward_scope.joins(:student_rewards).where(student_rewards: { student_id: current_student.id })
      }
    end

    def upcoming
      earned_reward_ids = current_student.student_rewards.pluck(:reward_id)
      upcoming_rewards = reward_scope.where.not(id: earned_reward_ids).where(kind: :badge, dimension: :word).where(
        Reward.arel_table[:value].gt(current_student.student_words_count)
      ).order(:value).limit(Reward::MAXIMUM_UPCOMING_REWARDS)
      render :index, locals: { rewards: upcoming_rewards }
    end

    private

    def reward_scope
      Reward.kept.includes(:language)
    end
  end
end
