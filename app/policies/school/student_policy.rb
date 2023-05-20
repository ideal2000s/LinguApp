# frozen_string_literal: true

module School
  class StudentPolicy < BasePolicy
    def assign_team_group?
      edit?
    end

    def assign_course?
      edit?
    end

    def index?
      role_from?(:member)
    end

    def show?
      index?
    end

    def new?
      role_from?(:member)
    end

    def create?
      new?
    end

    def edit?
      index?
    end

    def archive?
      edit?
    end

    def update?
      edit?
    end

    def destroy?
      false
    end

    def import_students?
      new?
    end

    def analyze_imported_file?
      new?
    end

    def create_batch?
      new?
    end

    def move_class?
      edit?
    end

    def revoke_team_group?
      edit?
    end

    def lessons?
      show?
    end

    def assign_lessons?
      edit?
    end

    def assign_licenses?
      edit?
    end

    def archived_students?
      edit?
    end

    def clear_archive?
      role_from?(:manager)
    end

    def remove_student?
      clear_archive?
    end

    def restore_student?
      edit?
    end

    def invite_students?
      new?
    end

    def send_invitations?
      new?
    end

    def courses?
      show?
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        scope.kept
             .includes(:native_language)
             .order(created_at: :desc)
      end
    end
  end
end
