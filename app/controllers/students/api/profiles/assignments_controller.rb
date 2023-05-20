# frozen_string_literal: true

module Students
  module API
    module Profiles
      class AssignmentsController < ApplicationController
        include PerPage

        def index
          render :index, locals: {
            student: current_student,
            assignments: assignment_scope.ransack(params[:q])
                                         .result(distinct: true)
                                         .page(params[:page])
                                         .per(per_page)
          }
        end

        private

        def assignment_scope
          current_student.assignments.includes(:student_assignments).order(created_at: :desc)
        end
      end
    end
  end
end
