# frozen_string_literal: true

module School
  module ActivitiesHelper
    def undo_activity_message(activity) # rubocop:disable all
      case activity.key
      when Activity::EVENT_TYPES[:license_created]
        return unless activity.recipient&.active_license

        undo_image + t('activerecord.attributes.activity.undo.revoke_license')
      when Activity::EVENT_TYPES[:license_updated]
        return unless activity.recipient&.active_license

        undo_image + t('activerecord.attributes.activity.undo.remove_end_date')
      when Activity::EVENT_TYPES[:license_revoked]
        return if activity.recipient&.active_license

        undo_image + t('activerecord.attributes.activity.undo.reassign_license')
      when Activity::EVENT_TYPES[:team_student_archived]
        return unless activity.trackable&.archived_at

        undo_image + t('activerecord.attributes.activity.undo.unarchive_student')
      end
    end

    def undo_image
      image_tag('icons/undo.svg', class: 'mr-2')
    end
  end
end
