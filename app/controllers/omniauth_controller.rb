# frozen_string_literal: true

class OmniauthController < ApplicationController
  def create
    result = Auth::Flows::OmniauthAuthenticate.call(oauth_hash: auth_hash)

    if result.success?
      sign_in(:user, result.value[:user])

      redirect_to redirect_url, notice: t('success_signed_in')
    else
      redirect_to redirect_back_path, alert: result.value
    end
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

  def redirect_url
    url = stored_location_for(:user)
    url = admin_dashboard_index_path if url.blank? || url == '/'

    store_location_for(:user, nil)

    url
  end

  def redirect_back_path
    session.delete(:redirect_back) || root_path
  end
end
