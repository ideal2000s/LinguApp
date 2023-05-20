# frozen_string_literal: true

class ErrorsController < ApplicationController
  skip_forgery_protection

  layout 'auth/index'

  def not_found
    respond_to do |format|
      format.html { render status: :not_found }
      format.any { render status: :not_found, plain: 'page not found' }
    end
  end
end
