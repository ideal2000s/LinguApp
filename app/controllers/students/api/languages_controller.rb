# frozen_string_literal: true

module Students::API
  class LanguagesController < ApplicationController
    ALLOWED_SCOPES = %w[active support].freeze

    skip_before_action :authenticate_student!

    def index
      languages = Language.ordered.send(scope.to_sym)
      render :index, locals: { languages: languages }
    end

    private

    def scope
      params_scope || 'support'
    end

    def params_scope
      @params_scope ||= params[:scope] if ALLOWED_SCOPES.include?(params[:scope])
    end
  end
end
