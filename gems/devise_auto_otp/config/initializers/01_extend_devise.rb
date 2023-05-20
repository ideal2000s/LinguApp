# frozen_string_literal: true

Devise::Mapping.prepend(DeviseAutoOtp::Mapping)
DeviseAutoOtp::Mailer.initialize!
