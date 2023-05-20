# frozen_string_literal: true

module Students
  module API
    module Lessons::Tasks
      class DocumentsController < ApplicationController
        include LessonFinders
        include TaskFinders

        def create
          document = documents_scope.new(document_params)
          if document.save
            render :create, locals: { document: document }, status: :created
          else
            render :create, locals: { document: document }, status: :unprocessable_entity
          end
        end

        def show
          render :show, locals: { document: document }, status: :ok
        end

        private

        def documents_scope
          current_student.documents.includes(:comments).create_with(assignable: task, team: team_reviewer)
        end

        def team_reviewer
          @team_reviewer ||=
            if (license = current_student.active_licenses.joins(:plan).find_by(plans: { language_id: lesson.language_id }))
              license.team
            elsif lesson.team
              lesson.team
            end
        end

        def document
          @document ||= documents_scope.find_by!(assignable: task)
        end

        def document_params
          params.require(:document).permit(:content, :audio)
        end
      end
    end
  end
end
