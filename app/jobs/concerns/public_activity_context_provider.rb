# frozen_string_literal: true

require 'request_store'

module PublicActivityContextProvider
  extend ActiveSupport::Concern

  def self.current_user
    RequestStore.store[:public_activity_owner]
  end

  def public_activity_owner(owner)
    PublicActivity.set_controller(PublicActivityContextProvider)
    RequestStore.store[:public_activity_owner] = owner
  end
end
