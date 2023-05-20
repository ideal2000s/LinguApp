# frozen_string_literal: true

module StudentLocaleSelector
  extend ActiveSupport::Concern
  included do
    around_action :switch_student_locale

    def switch_student_locale(&block)
      return yield unless respond_to?(:current_student)

      I18n.with_locale(current_student_locale, &block)
    end

    def current_student_locale
      if params[:locale].present? && available_locale?(params[:locale])
        current_student&.update(locale: params[:locale])
        session[:locale] = params[:locale]
        return params[:locale]
      end

      current_student&.locale || session[:locale] || I18n.default_locale
    end

    def available_locale?(locale)
      I18n.available_locales.map(&:to_s).include?(locale)
    end
  end
end
