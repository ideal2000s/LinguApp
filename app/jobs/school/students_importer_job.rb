# frozen_string_literal: true

module School
  class StudentsImporterJob < ::ApplicationJob
    include ::PublicActivityContextProvider

    def perform(current_user, current_team, student_params, team_group_id, plan_id)
      public_activity_owner(current_user)
      StudentFactory.create_batch(current_user: current_user,
                                  current_team: current_team,
                                  students_params: student_params,
                                  team_group_id: team_group_id,
                                  plan_id: plan_id)
    end
  end
end
