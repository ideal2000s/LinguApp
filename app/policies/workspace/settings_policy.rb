# frozen_string_literal: true

module Workspace
  class SettingsPolicy < WorkspacePolicy
    def index?
      user.admin?
    end

    def update?
      index?
    end
  end
end
