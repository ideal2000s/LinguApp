# frozen_string_literal: true

module School
  class ActivityPolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def activity_logs?
      index?
    end

    def undo_activity?
      case record.trackable_type
      when 'License', 'TeamStudent'
        role_from?(:owner)
      else
        false
      end
    end
  end
end
