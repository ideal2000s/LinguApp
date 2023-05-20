# frozen_string_literal: true

module School
  class SchoolAssignmentsController < ApplicationController
    before_action :authorize_action, except: %i[index new create]

    def index
      authorize_action(Assignment)
      @search = scope.ransack(params[:q])
      render :index, locals: { assignments: @search.result }
    end

    def new
      authorize_action(Assignment)
      assignment = scope.new
      render :new, locals: { assignment: assignment, students: students_scope }
    end

    def create
      assignment = scope.new(school_assignment_params)
      authorize_action(assignment)
      if assignment.save
        assignment.student_assignments.update_all(deadline: params[:deadline]) # rubocop:disable Rails/SkipsModelValidations
        render js: "window.location.href='#{school_assignments_path}'"
      else
        render :new, locals: { assignment: assignment, students: students_scope }
      end
    end

    def show
      student_assignments = assignment.student_assignments.order(:status)
      render :show, locals: { assignment: assignment, student_assignments: student_assignments }
    end

    def assign_student
      render :assign_student, locals: { assignment: assignment, students: students_scope }
    end

    def assign_student_post
      school_assignment_params[:student_ids].map do |e|
        student_assignment = assignment.student_assignments.find_or_create_by(student_id: e)
        student_assignment.update(deadline: params[:deadline])
      end
      render js: "window.location.href='#{school_assignment_path(assignment)}'"
    end

    def review
      student_assignment = StudentAssignment.find(params[:student_assignment])
      document = student_assignment.document
      comment = current_user.comments.new(commentable: document)
      render :review, locals: { student_assignment: student_assignment, document: document, comments: document&.comments,
                                comment: comment }
    end

    private

    def policy_class
      School::SchoolAssignmentPolicy
    end

    def authorize_action(record = Assignment)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def assignment
      scope.find(params[:id])
    end

    def scope
      current_team.assignments
    end

    def students_scope
      @students_scope ||= current_team.students.joins(:team_students).where(team_students: { archived_at: nil })
    end

    def school_assignment_params
      params.require(:assignment).permit(:name, :context, :language_id, :instruction, :team_id, student_ids: [])
    end
  end
end
