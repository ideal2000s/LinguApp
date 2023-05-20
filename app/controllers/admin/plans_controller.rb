# frozen_string_literal: true

module Admin
  class PlansController < ApplicationController
    def index
      authorize_action
      render :index, locals: { plans: scope.page(params[:page]) }
    end

    def new
      authorize_action
      plan = Plan.new
      render :new, locals: { plan: plan }
    end

    def create
      authorize_action
      plan = Plan.create(plan_params)
      respond_to do |format|
        if plan.save
          format.html { redirect_to edit_admin_plan_path(plan.id), notice: t('.created_plan') }
        else
          format.html { render :new, locals: { plan: plan } }
        end
      end
    end

    def edit
      authorize_action(plan)
      render :edit, locals: { plan: plan }
    end

    def update
      authorize_action(plan)
      if plan.update(plan_params)
        redirect_to admin_plans_path,
                    notice: "Plan #{helpers.link_to(plan.system_name, edit_admin_plan_path(plan))} was updated"
      else
        render :edit, locals: { plan: plan }, status: :unprocessable_entity
      end
    end

    private

    def plan
      @plan ||= scope.find(params[:id])
    end

    def authorize_action(record = Plan)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::PlanPolicy
    end

    def scope
      policy_scope(Plan, policy_scope_class: Admin::PlanPolicy::Scope)
    end

    def plan_params
      params.require(:plan).permit(:language_id, :system_name, *name_fields,
                                   :price, :price_currency, :plan_interval)
    end

    def name_fields
      I18n.available_locales.map { |locale| "name_#{locale}".to_sym }
    end
  end
end
