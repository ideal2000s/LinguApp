# frozen_string_literal: true

module Teach
  module Tasks
    class PreviewsController < ApplicationController
      skip_before_action :redirect_onboarding

      def show
        task.locale = I18n.locale.to_s
        respond_to do |f|
          f.html(&method(:render_html))
          f.json(&method(:render_json))
        end
      end

      def self.local_prefixes
        ['students/api/tasks']
      end

      private

      def render_json
        render :show, layout: 'teach/preview', locals: { task: task, lesson: lesson, student: nil, document: nil }
      end

      def render_html
        render 'teach/tasks/previews/show', layout: 'teach/preview', locals: { task: task, lesson: lesson }
      end

      def lesson
        @lesson ||= task.lesson
      end

      def task
        @task ||= scope.find(params[:task_id])
      end

      def policy_class
        PreviewPolicy
      end

      def scope
        policy_scope(Task, policy_scope_class: policy_class.const_get(:Scope))
      end
    end
  end
end
