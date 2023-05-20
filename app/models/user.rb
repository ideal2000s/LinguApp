# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  fname                  :string
#  lname                  :string
#  email                  :string
#  mobile                 :string
#  locale                 :string
#  role                   :integer          default("basic"), not null
#  status                 :integer          default("active"), not null
#  meta                   :jsonb            not null
#  discarded_at           :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  credits                :integer          default(0)
#  avatar_data            :text
#  lessons_count          :integer          default(0), not null
#  otp_secret             :string
#  last_otp_at            :datetime
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  default_team_user_id   :integer
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  time_zone              :string
#  hubspotid              :string
#

class User < ApplicationRecord
  thread_cattr_accessor :current
  include Discard::Model
  include AvatarUploader::Attachment(:avatar)
  include ImageUploader::Attachment(:signature)
  include PgSearch::Model

  devise :otp_authenticatable, :registerable, :lockable, :trackable
  attribute :lead, :boolean, default: false

  belongs_to :default_team_user, class_name: 'TeamUser', optional: true
  has_one :default_team, class_name: 'Team', through: :default_team_user

  has_many :identities, dependent: :destroy
  has_many :lessons, dependent: :destroy, inverse_of: :author, foreign_key: :author_id
  has_many :tasks, through: :lessons
  has_many :reviews, class_name: 'LessonReview', foreign_key: 'author_id', inverse_of: :author, dependent: :destroy
  has_many :owned_teams, class_name: 'Team', foreign_key: 'owner_id', inverse_of: :owner, dependent: :destroy
  has_many :team_invitations, dependent: :destroy, inverse_of: :user
  has_many :team_users, -> { kept }, dependent: :destroy, inverse_of: :user
  has_many :teams, through: :team_users
  has_many :managed_teams, -> { merge(TeamUser.kept.managers) }, through: :team_users, class_name: 'Team', source: :team
  has_many :posts, dependent: :destroy, inverse_of: :author, foreign_key: :author_id
  has_many :courses, dependent: :destroy, inverse_of: :author, foreign_key: :author_id
  has_many :user_languages, dependent: :destroy
  has_many :languages, through: :user_languages
  has_many :comments, as: :author, dependent: :destroy

  scope :ordered, -> { order('fname, lname') }

  enum role: { basic: 0, editor: 1, admin: 3 }
  enum status: { active: 0, closed: 1 }

  store_accessor :meta, %i[about signature_data language_scope table_view]

  validates :fname, :lname, presence: true, unless: :lead
  validates :email,
            uniqueness: {
              case_sensitive: false
            },
            presence: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }

  accepts_nested_attributes_for :user_languages

  multisearchable(
    against: %i[fname lname email mobile],
    additional_attributes: ->(user) { { team_ids: user.teams.ids } },
    unless: :discarded?
  )

  def self.active_options_for_select(scope = User.all)
    scope.active.select(:id, :fname, :lname, :email).map { |u| [u.full_name, u.id] }
  end

  def full_name
    "#{fname.to_s.titleize} #{lname.to_s.titleize}"
  end
  alias name full_name

  def initials
    "#{fname.to_s[0]}#{lname.to_s[0]}".upcase
  end

  def search_result
    "#{full_name} <#{email}>"
  end

  def default_team
    default_team_user&.team || team_users.first&.team || create_default_team(self).value[:team]
  end

  def actual_team_users
    team_users.kept.includes(:team).merge(Team.kept).by_team_name
  end

  def profile_complete?
    avatar.present? && about.present?
  end

  def update_locale!(new_locale)
    return if new_locale.nil? || locale == new_locale

    update_column(:locale, new_locale)
  end

  def followers_count
    owned_teams.pluck(:followers_count).sum
  end

  def create_default_team(user)
    Teams::Cases::CreateDefault.call(user: user)
  end

  def native_locale
    return locale unless language_scope.presence || I18n.available_locales.include?(Language.find(language_scope).code.to_sym)

    I18n.available_locales.include?(Language.find(language_scope).code.to_sym)
  end
end
