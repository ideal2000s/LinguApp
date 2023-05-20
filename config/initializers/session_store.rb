# frozen_string_literal: true

SessionStoreOptions = Struct.new(:tld_length, :key)

session_options = if Rails.env.staging?
                    SessionStoreOptions.new(3, '_staging_session_id')
                  else
                    SessionStoreOptions.new(2, '_session_id')
                  end
secure_cookies = Rails.env.staging? || Rails.env.production? || ENV.key?('SECURE_COOKIES')

Rails.application.config.session_store(
  :cookie_store,
  { domain: :all, expire_after: 1.month, secure: secure_cookies }.merge(session_options.to_h)
)
