# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@lingu.com'
  layout 'mailer'
end
