# frozen_string_literal: true

module Students::API
  class SkillsController < ApplicationController
    skip_before_action :authenticate_student!

    def index
      render :index, locals: { skills: Skill.all }
    end
  end
end
