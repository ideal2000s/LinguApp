# frozen_string_literal: true

module School
  class SearchController < ApplicationController
    def index
      authorize_action
      results = PgSearch.multisearch(params[:q]).where("#{current_team.id} = ANY(team_ids)").group_by(&:searchable_type)

      respond_to do |format|
        format.html { render :index, locals: { results: results, search_term: params[:q] } }
        format.js { render :index, locals: { results: results } }
      end
    end

    private

    def authorize_action(record = Student)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::SearchPolicy
    end
  end
end
