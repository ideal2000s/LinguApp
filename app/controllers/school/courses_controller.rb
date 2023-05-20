# frozen_string_literal: true

module School
  class CoursesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def index
      authorize_action
      @search = scope.includes([:author]).ransack(search_params)

      render :index, locals: { courses: @search.result.page(params[:page]).per(params[:limit]) }
    end

    def show
      authorize_action
      course_duration_stats = CourseStatsGetter.durations(course)
      render :show, locals: { course: course, course_duration_stats: course_duration_stats }, layout: 'school/empty'
    end

    # GET/POST /school/courses/:id/assign_team_group
    def assign_team_group
      authorize_action(course)
      return render_assign_team_group unless request.post?

      @groups = TeamGroup.where(id: course_params[:team_group_ids])
      course.team_groups = @groups
      @students = TeamStudent.where(team_group: @groups)
      course.team_students = @students
      course.save
      create_activity_for_groups
      create_activity_for_students

      flash.now[:notice] = t('.assigned', group: @groups.pluck(:name).join(', ')) if @groups.any?
    end

    def create_activity_for_groups
      @groups.each do |team_group|
        team_group.create_activity(:course_assign,
                                   owner: current_user,
                                   recipient: team_group.team,
                                   parameters: { course: course.title })
      end
    end

    def create_activity_for_students
      @students.find_each do |e|
        e.create_activity(:course_assign,
                          owner: current_user,
                          recipient: e.student,
                          parameters: { course: e.team_group&.course&.title })
      end
    end

    private

    def course
      @course ||= scope.friendly.find(params[:id])
    end

    def policy_class
      School::CoursePolicy
    end

    def scope
      policy_scope(school_courses_scope, policy_scope_class: School::CoursePolicy::Scope)
    end

    def school_courses_scope
      Course.kept.published.order(:title)
    end

    def team_groups
      current_team.team_groups.unarchived
    end

    def authorize_action(record = Course)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def course_params
      params.require(:course).permit(team_group_ids: [])
    end

    def search_params
      return nil if params[:q].blank?

      query = params[:q].permit(:language_id_in, :level_in, :author_id_in)
      query.to_h.each_with_object({}) do |(k, v), h|
        h[k] = k.end_with?('_in') ? v.split(',') : v
      end
    end

    def render_assign_team_group
      render :assign_team_group, locals: {
        team_groups: team_groups.by_language(course.language),
        course: course,
        current_team_group_id: 0
      }
    end

    def not_found
      flash.now[:alert] = t('.errors.team_group_not_selected')
      render
    end
  end
end
