# frozen_string_literal: true

module School
  class UsersController < ApplicationController
    def edit
      authorize_action(current_user)
      render :edit, locals: { user: current_user }
    end

    def update
      authorize_action(current_user)
      if current_user.update(user_params)
        render :form_submit
      else
        render :edit, locals: { user: current_user }
      end
    end

    private

    def authorize_action(record = User)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      School::UserPolicy
    end

    def user_params
      params.require(:user).permit(
        :fname, :lname, :email, :avatar, :remove_avatar, :mobile, :language_scope
      )
    end
  end
end
