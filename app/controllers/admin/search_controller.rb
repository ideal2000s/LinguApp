# frozen_string_literal: true

module Admin
  class SearchController < ApplicationController
    def index
      authorize_action
      render :index, locals: { results: PgSearch.multisearch(params[:q]).includes(:searchable).page(params[:page]) }
    end

    private

    def authorize_action(record = Language)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::SearchPolicy
    end
  end
end
