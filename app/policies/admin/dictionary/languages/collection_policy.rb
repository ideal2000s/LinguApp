# frozen_string_literal: true

module Admin
  module Dictionary
    module Languages
      class CollectionPolicy < ::ApplicationPolicy
        def index?
          user&.admin?
        end
      end
    end
  end
end
