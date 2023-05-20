# frozen_string_literal: true

module Admin
  class StudentBadgeGranter < Micro::Case
    attributes :student

    def call!
      student_words_count = student.student_words_count
      grantable_reward_ids = Reward.kept.where(kind: :badge, dimension: :word).where(
        Reward.arel_table[:value].lteq(student_words_count)
      ).pluck(:id)
      grantable_reward_ids.each do |reward_id|
        student_reward = student.student_rewards.where(reward_id: reward_id).first_or_initialize
        student_reward.save unless student_reward.persisted?
      end
      Success()
    end
  end
end
