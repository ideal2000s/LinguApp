# frozen_string_literal: true

# == Schema Information
#
# Table name: licenses
#
#  id              :bigint           not null, primary key
#  team_student_id :bigint           not null
#  plan_id         :bigint           not null
#  expires_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class License < ApplicationRecord
  include PublicActivity::Model
  tracked owner: ->(context, _model) { context&.current_user },
          recipient: :team_student,
          params: { end_date: :expires_at },
          only: %i[create update destroy]

  belongs_to :plan
  belongs_to :team_student
  has_one :team, through: :team_student

  attribute :expiration_date
  validate :apply_expiration_date

  after_commit on: %i[create] do
    team_student.active_license&.revoke
    team_student.update(active_license: self)
  end

  def apply_expiration_date
    return if expiration_date.nil?

    self.expires_at = Date.parse(expiration_date).end_of_day
  rescue ArgumentError
    errors.add(:expiration_date, 'invalid')
  end

  def revoke
    return unless team_student.active_license == self

    touch(:expires_at)
    team_student.update(active_license: nil)
    create_activity(:revoke, owner: ->(context, _model) { context&.current_user }, recipient: team_student)
  end

  def expired?
    expires_at < Time.zone.today
  end
end
