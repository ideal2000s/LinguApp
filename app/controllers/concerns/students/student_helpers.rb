# frozen_string_literal: true

module Students
  module StudentHelpers
    extend ActiveSupport::Concern

    included do
      before_action :set_sentry_context, :find_current_student
      before_action :set_student_locale
    end

    private

    def find_current_student
      Student.current = current_student
    end

    def set_sentry_context
      Sentry.configure_scope do |scope|
        scope.set_user(id: current_student.id, type: 'Student') if current_student
      end
    end

    def set_locale_from_browser
      http_accept_language.compatible_language_from(I18n.available_locales)
    end

    def set_student_locale
      locale = current_student&.native_locale
      locale ||= set_locale_from_browser
      locale ||= I18n.default_locale

      I18n.locale = locale
    end
  end
end
