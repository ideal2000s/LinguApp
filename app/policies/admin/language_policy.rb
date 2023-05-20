# frozen_string_literal: true

module Admin
  class LanguagePolicy < ApplicationPolicy
    def index?
      return false unless user

      user.read_attribute_before_type_cast(:role).positive?
    end

    def inactive?
      index?
    end

    def edit?
      index?
    end

    def update?
      index?
    end

    def add_character?
      index?
    end

    def remove_character?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.all
      end
    end
  end
end
