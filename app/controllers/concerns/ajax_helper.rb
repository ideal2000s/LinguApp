# frozen_string_literal: true

module AjaxHelper
  def ajax_redirect_to(redirect_uri)
    { js: "window.location = '#{redirect_uri}'" }
  end
end
