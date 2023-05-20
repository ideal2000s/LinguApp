# frozen_string_literal: true

module School
  class AssignmentsController < ApplicationController
    def index
      authorize_action
      @search = scope.ransack(params[:q])
      assignments_stats = AssignmentsStats.stats(scope, current_team)
      render :index, locals: { documents: @search.result, assignments_stats: assignments_stats }
    end

    def show
      authorize_action(document)
      comment = comment_scope.new(commentable: document)
      render :show, locals: { document: document, comment: comment, comments: document.comments.order(created_at: :asc) }
    end

    private

    def scope
      policy_scope(document_scope, policy_scope_class: School::AssignmentPolicy::Scope)
    end

    def document_scope
      Document.where(team: current_team)
    end

    def document
      @document = Document.find(params[:id])
    end

    def comment_scope
      current_user.comments
    end

    def policy_class
      School::AssignmentPolicy
    end

    def authorize_action(record = Student)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end
  end
end
