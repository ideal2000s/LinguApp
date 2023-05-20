# frozen_string_literal: true

module Cron
  class ActiveLicenseRevokerJob < ::ApplicationJob
    queue_as :default

    def perform
      TeamStudent.joins(:active_license).where('licenses.expires_at < CURRENT_TIMESTAMP').update(active_license: nil)
    end
  end
end
