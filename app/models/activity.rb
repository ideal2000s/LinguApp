# frozen_string_literal: true

# == Schema Information
#
# Table name: activities
#
#  id             :bigint           not null, primary key
#  trackable_type :string
#  trackable_id   :bigint
#  owner_type     :string
#  owner_id       :bigint
#  key            :string
#  parameters     :text
#  recipient_type :string
#  recipient_id   :bigint
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Activity < PublicActivity::Activity
  FOR_TEAM_USER = %w[license.create license.update license.revoke team.group_import team_group.create team_user.create].freeze
  scope :by_owner, ->(user) { where(owner: user).order(created_at: :desc) }
  scope :by_student, lambda { |student|
    where(trackable: student)
      .or(where(recipient: student))
      .order(created_at: :desc)
  }
  scope :by_team_student, lambda { |team_student|
    where(trackable: team_student)
      .or(where(recipient: team_student))
      .order(created_at: :desc)
  }
  scope :by_team2, lambda { |team|
    where(trackable: team)
      .or(where(recipient: team))
      .order(created_at: :desc)
  }
  scope :by_team_user, ->(team_user) { where(owner: team_user.user, key: FOR_TEAM_USER).order(created_at: :desc) }
  scope :by_team, (lambda do |team_id|
    joins("LEFT JOIN licenses ON trackable_id = licenses.id AND trackable_type = 'License'")
        .joins('LEFT JOIN team_students license_team_students ON license_team_students.id = licenses.team_student_id')
        .joins("LEFT JOIN team_students ON trackable_id = team_students.id AND trackable_type = 'TeamStudent'")
        .joins("LEFT JOIN users ON owner_id = users.id AND owner_type = 'User'")
        .where('team_students.team_id = ? OR license_team_students.team_id = ?', team_id, team_id)
        .order(created_at: :desc)
  end)
  scope :key_include, ->(keys) { where(key: keys.split(',')) }
  scope :owner_of_User_type_include, ->(users) { where(owner_id: users.split(','), owner_type: 'User') }

  EVENT_TYPES = { student_imported: 'team.import',
                  student_created: 'student.create',
                  group_assigned: 'team_student.group_assign',
                  lesson_completed: 'lesson_session.complete',
                  license_created: 'license.create',
                  license_revoked: 'license.revoke',
                  license_updated: 'license.update',
                  removed_expiration: 'license.removed_expiration',
                  team_group_created: 'team_group.create',
                  group_imported: 'team.group_import',
                  team_student_created: 'team_student.create',
                  team_student_archived: 'team_student.archive',
                  team_student_restored: 'team_student.restore',
                  team_student_discarded: 'team_student.discard',
                  team_student_undiscarded: 'team_student.undiscard',
                  team_user_created: 'team_user.create' }.freeze

  def self.ransackable_scopes(_auth_object = nil)
    %w[key_include owner_of_User_type_include]
  end
end
