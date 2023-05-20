# frozen_string_literal: true

Rails.configuration.middleware.use Browser::Middleware do
  redirect_to school_mobile_path if browser.device.mobile? && request.hostname.split('.')[0] == 'school'
end
