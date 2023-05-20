# frozen_string_literal: true

# == Schema Information
#
# Table name: team_users
#
#  id                 :bigint           not null, primary key
#  team_id            :bigint
#  user_id            :bigint
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  legacy_default     :boolean          default(FALSE)
#  role               :integer          default("member"), not null
#  discarded_at       :datetime
#  hubspot_associated :boolean          default(FALSE)
#
class TeamUser < ApplicationRecord
  include Discard::Model
  include PublicActivity::Model
  tracked owner: ->(context, _model) { context&.current_user },
          recipient: :team,
          only: :create

  belongs_to :team
  belongs_to :user, touch: true
  has_one :defaulted_to_user,
          class_name: 'User',
          foreign_key: :default_team_user_id,
          inverse_of: :default_team_user,
          dependent: :nullify

  # TODO: possibly redundant scope. remove after 21/01/2021
  # scope :default, -> { joins(:defaulted_to_user) }
  scope :by_team_name, -> { joins(:team).merge(Team.ordered) }
  scope :by_user_name, -> { joins(:user).merge(User.ordered) }
  scope :managers, -> { where(role: %i[manager owner]) }
  scope :exclude, ->(model) { where.not(id: model.id) }
  scope :exclude_user, ->(user_id) { where.not(user_id: user_id) }

  scope :role_include, (lambda do |roles|
    where(role: roles.split(','))
  end)

  delegate :name, :size, to: :team, prefix: true
  delegate :name, to: :user, prefix: true

  enum role: { member: 0, manager: 99, owner: 100 }

  validates :team_id, uniqueness: { scope: :user_id, conditions: -> { where(discarded_at: nil) } }

  accepts_nested_attributes_for :user

  after_commit :create_hubspot_integration, on: :create

  def self.ransackable_scopes(_auth_object = nil)
    %w[role_include]
  end

  def default?
    user.default_team_user == self
  end

  def default=(value)
    user.update(default_team_user: value ? self : nil)
  end

  private

  def create_hubspot_integration
    School::AddTeamUserHubspotJob.perform_later(id)
  end
end
