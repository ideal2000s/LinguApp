# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = 'https://bc4b32d387a24a849c80532c4d1cbea9@o503631.ingest.sentry.io/5588962'
  # config.breadcrumbs_logger = [:sentry_logger, :active_support_logger]
  config.enabled_environments = %w[production staging]
  config.async = lambda do |event|
    SentryJob.perform_later(event)
  end
  config.send_default_pii = false
  config.rails.report_rescued_exceptions
  config.backtrace_cleanup_callback = lambda do |backtrace|
    Rails.backtrace_cleaner.clean(backtrace)
  end
  config.excluded_exceptions += %w[ActionController::RoutingError ActiveRecord::RecordNotFound]
end
