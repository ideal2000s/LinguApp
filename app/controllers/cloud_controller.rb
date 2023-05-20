# frozen_string_literal: true

class CloudController < ActionController::Base
  def health_check
    Rails.logger.silence do
      head :ok
    end
  end
end
