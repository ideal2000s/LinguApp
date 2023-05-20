# frozen_string_literal: true

module DeviseAutoOtp
  module Mapping
    private

    def default_controllers(options)
      options[:controllers] ||= {}

      options[:controllers][:otp] ||= 'otp'

      super(options)
    end
  end
end
