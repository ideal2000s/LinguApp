# frozen_string_literal: true

# == Schema Information
#
# Table name: teams
#
#  id                       :bigint           not null, primary key
#  name                     :string
#  owner_id                 :bigint
#  status                   :integer          default("personal")
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  discarded_at             :datetime
#  image_data               :text
#  followers_count          :integer          default(0)
#  lessons_count            :integer          default(0), not null
#  meta                     :jsonb            not null
#  abilities                :string           default([]), is an Array
#  active_students_count    :integer          default(0)
#  gdpr_consent_at          :datetime
#  default_language_id      :bigint
#  business_registration_id :string
#  lingutest_enabled        :boolean          default(FALSE), not null
#  hubspotid                :string
#
class Team < ApplicationRecord
  ABILITIES_ARRAY = %w[authoring teaching licensing other].freeze

  include Discard::Model
  include AvatarUploader::Attachment(:image)
  include PDFUploader::Attachment(:gdpr_agreement)
  include PublicActivity::Model
  include PgSearch::Model

  thread_cattr_accessor :current

  belongs_to :owner, class_name: 'User', inverse_of: :owned_teams
  belongs_to :default_language, class_name: 'Language', optional: true
  has_many :team_users, -> { kept }, dependent: :destroy, inverse_of: :team
  has_many :team_domains, dependent: :destroy, inverse_of: :team
  has_many :team_groups, -> { kept }, dependent: :destroy, inverse_of: :team
  has_many :users, through: :team_users
  has_many :lessons, dependent: :restrict_with_error
  has_many :team_followers, dependent: :destroy, inverse_of: :team
  has_many :followers, through: :team_followers, source: :student
  has_many :oauth_apps, class_name: 'OAuth::App', dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :team_students, -> { kept }, class_name: 'TeamStudent', dependent: :destroy, inverse_of: :team
  has_many :students, through: :team_students
  has_many :courses, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :documents, dependent: :restrict_with_exception

  enum status: { personal: 0, school: 1, enterprise: 2 }

  store_accessor :meta, %i[about gdpr_agreement_data
                           country state city street_address postal_code
                           privacy_url gdpr_contact_name destroy_user_data_after]

  scope :ordered, -> { order('UPPER(name)') }

  delegate :size, to: :team_users

  validates :name, presence: true, if: :school?

  multisearchable against: :name, unless: :discarded?

  accepts_nested_attributes_for :owner, :team_users

  ransacker :team_users_count do
    query = '(SELECT COUNT(*) FROM team_users where team_users.team_id = teams.id)'
    Arel.sql(query)
  end

  ransacker :documents_count do
    query = '(SELECT COUNT(*) FROM documents where documents.team_id = teams.id)'
    Arel.sql(query)
  end

  def id_name
    "#{name} (#{id})"
  end

  def name
    return super if school? || new_record?

    super.presence || owner.full_name
  end

  def image(*args)
    return super if new_record?

    super.presence || owner.avatar
  end

  def gdpr_consented?
    gdpr_consent_at.present?
  end

  def school_member?
    active_students_count.positive?
  end

  def avg_response_time
    documents = Document.where(team: self)
    return if documents.blank?

    documents.sum(&:response_time).fdiv(documents.size)
  end

  def search_result
    name
  end
end
