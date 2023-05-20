# frozen_string_literal: true

class SessionsController < DeviseAutoOtp::OtpController
  def create
    super do |user|
      create_default_team(user)
    end
  end

  private

  def create_default_team(user)
    Teams::Cases::CreateDefault.call(user: user)
  end
end
