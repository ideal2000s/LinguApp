# frozen_string_literal: true

module School
  class TeamUsersController < ApplicationController
    def index
      authorize_action
      team_users = current_team.team_users
                               .includes(:user, user: [{ user_languages: :language }])
                               .order('users.lname')
      @search = team_users.ransack(params[:q])
      render :index, locals: { team_users: @search.result,
                               total_count: current_team.team_users.count,
                               has_filter: params[:q] && params[:q][:role_include].present? }
    end

    def create
      authorize_action
      team_user = team_users_scope.new(create_params)
      team_user.user.user_languages.new(user_languages_params) if params[:user_languages].present?
      team_user.user.language_scope = params[:language_scope] if params[:language_scope].present?
      if team_user.save
        render :form_submit
      else
        render :new, locals: { team_user: team_user }
      end
    end

    def edit
      authorize_action(team_user)
      render :edit, locals: { team_user: team_user }
    end

    def new
      authorize_action
      return unless gdpr_consented?

      team_user = team_users_scope.new
      team_user.build_user
      team_user.user.user_languages.new
      render :new, locals: { team_user: team_user }
    end

    def update # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
      authorize_action(team_user)
      team_user.user.language_scope = params[:language_scope] if params[:language_scope].present?
      if team_user.update(team_user_params)
        if params[:user_languages].present?
          team_user.user.user_languages.destroy_all
          team_user.user.user_languages.create(user_languages_params)
        end
        render :form_submit
      else
        render :edit, locals: { team_user: team_user }
      end
    end

    def destroy
      authorize_action(team_user)
      team_user.discard
      render :form_submit
    end

    def show
      authorize_action(team_user)
      @search = team_user.user.lessons.published.includes(:language).order(created_at: :desc).ransack(params[:q])
      lessons = @search.result
      render :show, locals: { team_user: team_user, lessons: lessons, active_languages: Language.active }
    end

    def activities
      activities = Activity.by_team_user(team_user).page(params[:page])
      render :activities, locals: { team_user: team_user, activities: activities }
    end

    def import_team_users
      authorize_action
      return unless gdpr_consented?

      render :import_team_users
    end

    def analyze_imported_file
      authorize_action
      result = ImportFileAnalyzer.analyze(file_param: params[:file])
      render :analyze_imported_file, layout: nil, locals: { file_name: result[:original_file_name],
                                                            users: result[:users],
                                                            errors: result[:errors] }
    end

    def create_batch
      authorize_action
      ::School::TeamUsersImporterJob.perform_later(current_user, current_team, users_params[:users])
      redirect_to school_team_users_path,
                  notice: I18n.t('school.teachers.import.import_in_progress')
    end

    private

    def authorize_action(record = Student)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::TeamUserPolicy
    end

    def scope
      policy_scope(team_users_scope, policy_scope_class: School::TeamUserPolicy::Scope)
    end

    def team_user
      @team_user ||= team_users_scope.find(params[:id])
    end

    def team_users_scope
      current_team.team_users
    end

    def team_user_params
      params.require(:team_user).permit(:role, user_attributes: %i[id fname lname email mobile])
    end

    def users_params
      params.permit(users: %i[fname lname email mobile language_data valid])
    end

    def create_params
      team_user_params.tap do |hash|
        if hash[:user_attributes] && hash[:user_attributes][:password].blank?
          hash[:user_attributes][:password] = password_generator
        end
      end
    end

    def user_languages_params
      return [] if params[:user_languages].blank?

      user_languages = []
      params[:user_languages].each do |language_id|
        user_languages.push({ language_id: language_id.to_i })
      end
      user_languages
    end
  end
end
