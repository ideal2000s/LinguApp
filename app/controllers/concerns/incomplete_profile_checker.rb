# frozen_string_literal: true

module IncompleteProfileChecker
  extend ActiveSupport::Concern
  included do
    prepend_before_action :ensure_user_valid!

    private

    def ensure_user_valid!
      return unless user_signed_in?
      return if params[:controller] == 'profiles'
      return if current_user.valid?

      redirect_path = request.subdomain == 'school' ? incomplete_profile_path : profile_path

      redirect_to(redirect_path,
                  flash: {
                    alert: t('incomplete_profile_information', default: 'Incomplete profile, please update your information.')
                  })
    end
  end
end
