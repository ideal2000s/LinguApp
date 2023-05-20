# frozen_string_literal: true

module Students
  module API
    module Cases
      class CreateLessonSession < Micro::Case::Strict
        attributes :lesson, :student

        attr_accessor :lesson_session

        def call!
          LessonSession.transaction do
            update_previous_sessions
            create_lesson_session
          end

          Success(lesson_session: lesson_session)
        rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotUnique
          Failure(I18n.t('admin.lesson_sessions.create_failed'))
        end

        private

        def update_previous_sessions
          LessonSession.active.where(lesson: lesson, student: student).each(&:canceled!)
        end

        def create_lesson_session
          @lesson_session = lesson.sessions.create!(
            student: student,
            status: :active
          )
        end
      end
    end
  end
end
