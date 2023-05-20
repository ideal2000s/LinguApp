# frozen_string_literal: true

module DeviseRequestSpecHelpers
  include Warden::Test::Helpers

  def sign_in(resource, scope:)
    login_as(resource, scope: scope)
  end

  def sign_out(resource)
    scope = Devise::Mapping.find_scope!(resource)
    logout(scope)
  end
end

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Devise::Test::ControllerHelpers, type: :view
  config.include DeviseRequestSpecHelpers, type: :request
end
