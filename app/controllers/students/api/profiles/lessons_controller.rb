# frozen_string_literal: true

module Students
  module API
    module Profiles
      class LessonsController < ApplicationController
        include PerPage

        def index
          render :index, locals: {
            lessons: lesson_scope.ransack(params[:q])
                                 .result(distinct: true)
                                 .page(params[:page])
                                 .per(per_page)
          }
        end

        private

        def params_state
          @params_state ||= params[:state] if allowed_state?
        end

        def state
          params_state || 'active'
        end

        def lesson_scope
          current_student.send("lessons_#{state.to_sym}").includes(:sessions).order(created_at: :desc)
        end

        def allowed_states
          @allowed_states ||= %w[active finished].freeze
        end

        def allowed_state?
          allowed_states.include?(params[:state])
        end
      end
    end
  end
end
