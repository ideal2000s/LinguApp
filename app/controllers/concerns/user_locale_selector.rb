# frozen_string_literal: true

module UserLocaleSelector
  extend ActiveSupport::Concern
  included do
    around_action :switch_user_locale

    def switch_user_locale(&block)
      return yield unless respond_to?(:current_user)

      I18n.with_locale(current_user_locale, &block)
    end

    def current_user_locale # rubocop:disable Metrics/AbcSize
      if params[:locale].present? && available_locale?(params[:locale])
        current_user&.update(locale: params[:locale])
        session[:locale] = params[:locale]
        return params[:locale]
      end
      return current_user.locale if current_user
      return session[:locale] if session[:locale].present?

      # TODO: get from user agent
      I18n.default_locale
    end

    def available_locale?(locale)
      I18n.available_locales.map(&:to_s).include?(locale)
    end
  end
end
