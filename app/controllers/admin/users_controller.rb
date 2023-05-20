# frozen_string_literal: true

module Admin
  class UsersController < ApplicationController
    def index
      authorize_action
      render :index, locals: { users: scope.active.page(params[:page]) }
    end

    def create
      authorize_action
      user = User.create(user_params)
      respond_to do |format|
        if user.save
          format.html { redirect_to edit_admin_user_path(user.id) }
        else
          format.html { render :new, locals: { user: user } }
        end
      end
    end

    def new
      authorize_action
      user = User.new
      render :new, locals: { user: user }
    end

    def edit
      authorize_action(user)
      render :edit, locals: { user: user, team_users: user.team_users.includes(:team) }
    end

    def update
      authorize_action(user)
      if user.update(user_params)
        redirect_to edit_admin_user_path(user),
                    notice: "User account #{helpers.link_to(user.full_name, edit_admin_user_path(user))} was updated"
      else
        render :edit, locals: { user: user }, status: :unprocessable_entity
      end
    end

    def destroy
      authorize_action(user)
      user.discard!
      redirect_to admin_users_path, notice: 'The user account was discarded'
    end

    private

    def user
      @user ||= scope.find(params[:id])
    end

    def authorize_action(record = User)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::UserPolicy
    end

    def scope
      policy_scope(User, policy_scope_class: Admin::UserPolicy::Scope)
    end

    def user_params
      params.require(:user).permit(:email, :fname, :lname, :mobile, :locale, :role,
                                   :status, :about, :default_subject, :language_scope, team_ids: [])
    end
  end
end
