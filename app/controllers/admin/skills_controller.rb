# frozen_string_literal: true

module Admin
  class SkillsController < ApplicationController
    def index
      authorize_action
      render :index, locals: { skills: scope.all }
    end

    def show
      authorize_action(skill)
      render :show, locals: { skill: skill }
    end

    def create
      authorize_action
      skill = Skill.create(skill_params)
      respond_to do |f|
        if skill.save
          f.js { render :create, locals: { skill: skill } }
          f.html { redirect_back(fallback_location: admin_skills_path) }
        else
          f.js { render 'admin/skills/show', locals: { record: skill } }
        end
      end
    end

    def update
      authorize_action(skill)
      if skill.update(skill_params)
        redirect_to admin_skills_path(anchor: 'skills'), notice: I18n.t('skill_updated', scope: 'form')
      else
        render 'admin/skills/show', locals: { record: skill }, status: :unprocessable_entity
      end
    end

    private

    def skill
      @skill ||= scope.find(params[:id])
    end

    def authorize_action(record = Skill)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::SkillPolicy
    end

    def scope
      policy_scope(Skill, policy_scope_class: Admin::SkillPolicy::Scope)
    end

    def skill_params
      params.require(:skill).permit(:name, :printable, *name_fields)
    end

    def name_fields
      I18n.available_locales.map { |locale| "name_#{locale}".to_sym }
    end
  end
end
