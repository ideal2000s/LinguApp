# frozen_string_literal: true

# == Schema Information
#
# Table name: team_invitations
#
#  id             :bigint           not null, primary key
#  team_domain_id :bigint           not null
#  user_id        :bigint           not null
#  status         :integer          default("pending")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class TeamInvitation < ApplicationRecord
  belongs_to :team_domain
  belongs_to :user
  has_one :team, through: :team_domain

  enum status: { pending: 0, accepted: 1, declined: 2 }

  validates :team_domain_id, :user_id, presence: true
  validates :user_id, uniqueness: { scope: :team_domain_id }

  delegate :name, to: :team, prefix: true, allow_nil: true
end
