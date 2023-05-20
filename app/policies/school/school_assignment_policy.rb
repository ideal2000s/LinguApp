# frozen_string_literal: true

module School
  class SchoolAssignmentPolicy < BasePolicy
    def index?
      role_from?(:member)
    end

    def new?
      index?
    end

    def create?
      new?
    end

    def show?
      index?
    end

    def assign_student?
      new?
    end

    def assign_student_post?
      assign_student?
    end

    def review?
      assign_student?
    end
  end
end
