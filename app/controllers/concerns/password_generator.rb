# frozen_string_literal: true

module PasswordGenerator
  extend ActiveSupport::Concern

  def password_generator
    SecureRandom.urlsafe_base64(7)
  end
end
