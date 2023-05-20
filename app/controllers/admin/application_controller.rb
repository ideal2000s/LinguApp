# frozen_string_literal: true

module Admin
  class ApplicationController < ::ApplicationController
    include UserControllerContext
    before_action :authenticate_user!

    layout 'admin/admin'

    def policy(record)
      super([:admin, record])
    end

    def nav_policy
      Admin::NavigationPolicy.new(current_user)
    end
    helper_method :nav_policy

    private

    def after_sign_in_path_for(resource)
      stored_location_for(resource) ||
        (!resource.basic? && admin_dashboard_index_path) ||
        super
    end
  end
end
