# frozen_string_literal: true

module School
  class LicensesController < ApplicationController
    def create
      authorize_action

      scope.create!(plan_id: params[:plan_id])
      redirect_back(fallback_location: school_student_path(team_student.student))
    end

    def update
      authorize_action(license)

      license.update(license_params)
      redirect_back(fallback_location: school_student_path(team_student.student))
    end

    def destroy
      authorize_action(license)

      license.revoke
      redirect_back(fallback_location: school_student_path(team_student.student))
    end

    def revoke_license
      authorize_action
      render :revoke_license, locals: { team_student: team_student }
    end

    def remove_end_date
      authorize_action(license)
      license.update!(expires_at: nil)
      redirect_back(fallback_location: school_student_path(team_student.student), notice: t('.removed_end_date'))
    end

    private

    def license
      scope.find(params[:id])
    end

    def team_student
      current_team.team_students.find(params[:team_student_id])
    end

    def authorize_action(record = License)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::LicensePolicy
    end

    def scope
      team_student.licenses
    end

    def license_params
      params.require(:license).permit(:expiration_date)
    end
  end
end
