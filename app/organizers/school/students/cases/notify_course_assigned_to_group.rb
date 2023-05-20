# frozen_string_literal: true

module School
  module Students
    class Cases::NotifyCourseAssignedToGroup < Micro::Case::Strict
      attributes :course, :student, :team

      def call!
        School::CourseMailer.with(course: course, student: student, team: team).course_assigned_notification.deliver_later
        Success(course: course, student: student)
      end
    end
  end
end
