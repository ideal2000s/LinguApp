# frozen_string_literal: true

module Students
  module API
    module TaskSessionFinders
      include LessonSessionFinders
      include TaskFinders

      private

      def task_session
        @task_session ||= TaskSession.find_session!(lesson_session: lesson_session, task: task)
      rescue ActiveRecord::RecordNotFound => e
        # If student loads task and has no task session, create task session
        Cases::CreateTaskSession
          .call(lesson_session: lesson_session, task: task)
          .on_success do |task_session:, **_args|
            return @task_session = task_session
          end
        raise e
      end

      def lesson_session
        super
      rescue ActiveRecord::RecordNotFound => e
        # If student loads task and has no lesson session, create lesson session
        Flows::CreateLessonSession
          .call(lesson: lesson, student: current_student)
          .on_success do |lesson_session:, **_args|
          return @lesson_session = lesson_session
        end
        raise e
      end
    end
  end
end
