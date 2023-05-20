# frozen_string_literal: true

module School
  class LicensePolicy < BasePolicy
    def create?
      role_from?(:member)
    end

    def update?
      create? && record.id == record.team_student.active_license_id
    end

    def destroy?
      update?
    end

    def revoke_license?
      create?
    end

    def remove_end_date?
      update?
    end
  end
end
