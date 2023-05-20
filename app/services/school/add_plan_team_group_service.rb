# frozen_string_literal: true

module School
  class AddPlanTeamGroupService
    class << self
      def assign_license_to_members(team_group:, plan_id:)
        new.assign_license_to_members(team_group: team_group, plan_id: plan_id)
      end
    end

    def assign_license_to_members(team_group:, plan_id:)
      ActiveRecord::Base.transaction do
        team_group.team_students
                  .left_joins(:active_license)
                  .where('(team_students.active_license_id IS NULL OR licenses.plan_id <> ?)', plan_id).each do |team_student|
          License.create!(team_student_id: team_student.id, plan_id: plan_id)
        end
      end
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotUnique
      { errors: [I18n.t('school.team_students.profile.license_failed')] }
    end
  end
end
