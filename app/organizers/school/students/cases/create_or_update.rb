# frozen_string_literal: true

module School
  module Students
    class Cases::CreateOrUpdate < Micro::Case::Strict
      attributes :current_user, :current_team, :scope, :student_params, :params

      def call!
        student = find_or_initialize_student

        if student.save
          if params[:class].present?
            team_student(student).update!(team_group_id: params[:class])
            team_student(student).create_activity(:group_assign, owner: current_user, recipient: student)
          end
          Success(team_student: team_student(student))
        else
          Failure(:error) { { student: student } }
        end
      end

      private

      def find_or_initialize_student
        student = Student.create_with(student_params.except(:email).merge(school_teams: [current_team]))
                         .find_or_initialize_by(email: student_params[:email])
        student = update_student_attributes(student) unless student.new_record?
        student
      end

      def update_student_attributes(student)
        student.attributes = compact_attributes(student)
        student.team_students.create(team: current_team)
        unless student.active_student_target_language
          student.student_target_languages.new(student_params[:student_target_languages_attributes]['0'])
        end
        student
      end

      def compact_attributes(student)
        student_params
          .except(:student_target_languages_attributes, :student_support_languages_attributes)
          .reject { |k, _v| student.send(k).present? }
      end

      def team_student(student)
        current_team.team_students.find_by(student: student)
      end
    end
  end
end
