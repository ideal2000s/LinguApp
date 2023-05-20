# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit
  include Meta
  include PublicActivity::StoreController

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :set_paper_trail_whodunnit, :set_locale

  helper ActionText::Engine.helpers

  private

  def set_locale_from_browser
    http_accept_language.compatible_language_from(I18n.available_locales)
  end

  def set_locale
    locale = set_locale_from_browser
    locale ||= I18n.default_locale
    I18n.locale = locale
  end
end
