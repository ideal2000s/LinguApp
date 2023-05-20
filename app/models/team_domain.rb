# frozen_string_literal: true

# == Schema Information
#
# Table name: team_domains
#
#  id         :bigint           not null, primary key
#  team_id    :bigint           not null
#  domain     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TeamDomain < ApplicationRecord
  has_many :team_invitations, dependent: :destroy, inverse_of: :team_domain
  belongs_to :team

  validates :team_id, presence: true
  validates :domain,
            presence: true,
            uniqueness: { scope: :team_id },
            format: {
              with: /\A[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/
            }
end
