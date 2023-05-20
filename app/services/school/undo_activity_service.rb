# frozen_string_literal: true

module School
  class UndoActivityService
    class << self
      def call(**args)
        new(**args).call
      end
    end

    def initialize(current_team:, activity:, current_user:)
      self.current_team = current_team
      self.activity = activity
      self.current_user = current_user
    end

    def call # rubocop:disable Metrics/MethodLength,Metrics/CyclomaticComplexity,Metrics/AbcSize
      ActiveRecord::Base.transaction do
        case activity.key
        when Activity::EVENT_TYPES[:license_created]
          activity.trackable.revoke
        when Activity::EVENT_TYPES[:license_updated]
          activity.trackable.update_column(:expires_at, nil) if team_student.active_license.present?
          activity.trackable.create_activity(:removed_expiration, owner: current_user, recipient: team_student.student)
        when Activity::EVENT_TYPES[:license_revoked]
          team_student.licenses.create!(plan_id: activity.trackable.plan_id) if team_student.active_license.blank?
        when Activity::EVENT_TYPES[:team_student_archived]
          team_student.unarchive! if team_student.archived_at?
        end
      end
      { activity: activity }
    rescue ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotUnique
      { errors: [I18n.t('school.activities.failed')] }
    end

    private

    def team_student
      case activity.trackable_type
      when License.to_s
        activity.trackable.team_student
      when TeamStudent.to_s
        activity.trackable
      end
    end

    attr_accessor :current_team, :activity, :current_user
  end
end
