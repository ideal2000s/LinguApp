require 'silencer/logger'

Rails.application.configure do
  config.middleware.swap(
    Rails::Rack::Logger,
    Silencer::Logger,
    config.log_tags,
    silence: [
      %r{^/api/lesson_sessions/\d+/task_sessions/\d+/heartbeat$},
      '/_health'
    ]
  )
end
