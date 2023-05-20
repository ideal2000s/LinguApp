# frozen_string_literal: true

module Admin
  class CoursePolicy < ApplicationPolicy
    def index?
      return false unless user

      user.read_attribute_before_type_cast(:role).positive?
    end

    def show?
      index?
    end

    def words?
      index?
    end

    def level_words?
      index?
    end

    def translate_words?
      index?
    end

    def reset_phrases_count?
      index?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept.friendly.by_language(user.language_scope)
      end
    end
  end
end
