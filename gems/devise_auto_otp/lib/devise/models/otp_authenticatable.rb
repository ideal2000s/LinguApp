# frozen_string_literal: true

require 'rotp'

module Devise::Models
  module OtpAuthenticatable
    extend ActiveSupport::Concern
    include DatabaseAuthenticatable

    included do
      validates_presence_of :email
      validates_uniqueness_of :email, allow_blank: false, if: :email_changed?
      validates_format_of :email, with: Devise.email_regexp, allow_blank: true, if: :email_changed?

      before_save do
        self.otp_secret ||= ROTP::Base32.random
        self.last_otp_at ||= Time.zone.now
      end

      attr_reader :password
    end

    module ClassMethods
      ::Devise::Models.config(self, :otp_authentication_timeout)

      # We assume this method already gets the sanitized values from the
      # DatabaseAuthenticatable strategy. If you are using this method on
      # your own, be sure to sanitize the conditions hash to only include
      # the proper fields.
      def find_for_database_authentication(conditions)
        find_for_authentication(conditions.slice(:email))
      end
    end

    def self.required_fields(klass)
      %i[encrypted_password otp_secret] + klass.authentication_keys
    end

    def after_database_authentication
      update_columns(encrypted_password: otp, otp_secret: ROTP::Base32.random) # rubocop:disable Rails/SkipsModelValidations
    end

    # Verifies whether a password (ie from sign in) is the user password.
    def valid_password?(password)
      Devise::Encryptor.compare(self.class, encrypted_password, password)
    rescue BCrypt::Errors::InvalidHash
      false
    end

    def send_otp_instructions
      assign_attributes(otp_secret: ROTP::Base32.random) if otp_secret.blank?
      update(password: otp)

      send_devise_notification(:otp_instructions, otp)
    end

    def otp
      @otp ||= otp_service.at(last_otp_at!.to_i)
    end

    def last_otp_at!
      return last_otp_at if last_otp_at_valid?

      update(last_otp_at: Time.zone.now)
      last_otp_at
    end

    def verify_otp!(code)
      last_otp_at_valid? &&
        !!otp_service.verify(code, last_otp_at.to_i) && # rubocop:disable Style/DoubleNegation
        update(last_otp_at: Time.zone.now)
    end

    def otp_service
      ROTP::HOTP.new(otp_secret)
    end

    private

    def last_otp_at_valid?
      return unless last_otp_at

      last_otp_at >= Devise.otp_authentication_timeout.ago
    end
  end
end
