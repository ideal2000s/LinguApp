# frozen_string_literal: true

module School
  class ActivitiesController < ApplicationController
    def index
      authorize_action
      if params[:student_id].present?
        activities = Activity.by_team_student(team_student).page(params[:page])
        render :student_activities, locals: { student: student, activities: activities }
      else
        activities = Activity.by_team_user(team_user).page(params[:page])
        render :team_user_activities, locals: { team_user: team_user, activities: activities }
      end
    end

    def activity_logs
      authorize_action
      collection = Activity.by_team(current_team.id).includes(:owner, :recipient, :trackable).distinct.page(params[:page])
      @search = collection.ransack(params[:q])
      render :activity_logs, locals: { activities: @search.result, owners: current_team.team_users }
    end

    def undo_activity
      authorize_action(activity)
      result = School::UndoActivityService.call(current_team: current_team, activity: activity, current_user: current_user)
      if result[:errors].blank?
        redirect_to activity_logs_school_activities_path
      else
        redirect_to activity_logs_school_activities_path, notice: result[:errors][0]
      end
    end

    private

    def activity
      @activity ||= Activity.find(params[:id])
    end

    def student
      @student ||= Student.find(params[:student_id])
    end

    def team_user
      @team_user ||= TeamUser.find(params[:team_user_id])
    end

    def team_student(current_student = student)
      current_team.team_students.find_by(student: current_student)
    end
    helper_method :team_student

    def authorize_action(record = Activity)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::ActivityPolicy
    end
  end
end
