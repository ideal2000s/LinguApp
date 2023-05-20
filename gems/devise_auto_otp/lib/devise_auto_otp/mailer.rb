# frozen_string_literal: true

require 'devise/mailer'

module DeviseAutoOtp
  module Mailer
    def self.initialize!
      Devise::Mailer.include(self)
    end

    def otp_instructions(record, otp, opts = {})
      @otp = otp
      I18n.with_locale(locale_for_resource(record)) do
        devise_mail(record, :otp_instructions, opts.merge(otp_instructions_data))
      end
    end

    private

    def otp_instructions_data # rubocop:disable Metrics/MethodLength
      {
        template_id: 'd-f8773a7dbdcd469085d6e58f98fce6d9',
        dynamic_template_data: {
          subject_line: t('course_mailer.otp.subject_line'),
          unique_code: @otp,
          ignore_msg: t('course_mailer.otp.ignore_msg'),
          code_line: t('course_mailer.otp.unique_code_for_lingu'),
          notification_link: t('course_mailer.course_assigned_notification.notification_link'),
          support_link: t('course_mailer.course_assigned_notification.support_link')
        }
      }
    end

    def locale_for_resource(record)
      return I18n.default_locale unless record.respond_to?(:support_languages)

      record.support_languages.first&.code || I18n.default_locale
    end
  end
end
