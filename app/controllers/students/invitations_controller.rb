# frozen_string_literal: true

module Students
  class InvitationsController < ApplicationController
    layout 'blank'
    skip_before_action :authenticate_student!
    before_action :team_joinable?

    def show
      return join_without_email if params[:email].blank?

      join_with_email
    end

    def join
      result = School::StudentFactory.create(current_team: team,
                                             students_params: student_params,
                                             team_group_id: params[:team_group_id],
                                             plan_id: params[:plan_id])
      if result[:errors].blank?
        redirect_to root_path
      else
        join_with_email(errors: result[:errors])
      end
    end

    private

    def check_student_authenticated!
      return if student_signed_in?

      redirect_to new_student_session_path, flash: {
        alert: t('.sign_in_to_accept_invitation',
                 default: 'You need to sign in or sign up to accept school invitation.')
      }
    end

    def join_with_email(errors: [])
      render :join, locals: { team: team,
                              team_group_id: params[:team_group_id],
                              plan_id: params[:plan_id],
                              email: params[:email], errors: errors }
    end

    def join_without_email
      check_student_authenticated! ||
        render(:join, locals: { user: current_student,
                                team: team,
                                team_group_id: params[:team_group_id],
                                plan_id: params[:plan_id],
                                email: nil,
                                errors: [] })
    end

    def team_joinable?
      render :join_error, status: :locked unless can_join_team?
    end

    def can_join_team?
      return true unless team_group

      team_group.archived_at.blank? && team_group.joinable?
    end

    def team
      @team = GlobalID::Locator.locate(params[:team_id])
      raise ActiveRecord::RecordNotFound if @team.discarded?

      @team
    end

    def team_group
      @team_group ||= TeamGroup.find_by(id: params[:team_group_id])
    end

    def student_params
      params.permit(:fname, :lname, :email).tap do |attrs|
        attrs[:email] ||= current_student.email if current_student
      end
    end
  end
end
