# frozen_string_literal: true

module Students::API
  class AssignmentsController < ApplicationController
    def index
      assignments = current_student.assignments
      render :index, locals: { assignments: assignments }
    end
  end
end
