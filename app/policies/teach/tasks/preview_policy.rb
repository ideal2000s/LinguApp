# frozen_string_literal: true

module Teach
  module Tasks
    class PreviewPolicy < BasePolicy
      def show?
        return false unless user

        user.present?
      end

      class Scope < ApplicationPolicy::Scope
        def resolve
          scope.kept
        end
      end
    end
  end
end
