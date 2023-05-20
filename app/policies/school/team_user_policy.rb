# frozen_string_literal: true

module School
  class TeamUserPolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def new?
      role_from?(:manager)
    end

    def create?
      new?
    end

    def show?
      index?
    end

    def edit?
      index?
    end

    def update?
      new?
    end

    def destroy?
      new?
    end

    def lessons?
      index?
    end

    def import_team_users?
      new?
    end

    def analyze_imported_file?
      new?
    end

    def create_batch?
      new?
    end
  end
end
