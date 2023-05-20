# frozen_string_literal: true

module Admin
  class DashboardController < ApplicationController
    layout 'admin/admin'

    def index
      authorize_action
      render :index, locals: { task_count: Task.published.size }
    end

    private

    def authorize_action(record = nil)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::DashboardPolicy
    end
  end
end
