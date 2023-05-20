# frozen_string_literal: true

module School
  module Students
    class Cases::CreateLicense < Micro::Case::Strict
      attributes :current_user, :team_student, :params

      def call!
        License.create!(team_student: team_student, plan_id: params[:plan_id]) if params[:plan_id].present?
        Success(team_student: team_student)
      rescue ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotUnique
        Failure(:error) { { student: team_student.student } }
      end
    end
  end
end
