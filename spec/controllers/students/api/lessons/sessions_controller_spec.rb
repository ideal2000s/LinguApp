# frozen_string_literal: true

require 'rails_helper'

module Students
  module API
    module Lessons
      RSpec.describe SessionsController, type: :controller do
        before do
          allow(controller).to receive(:current_student).and_return(current_student)
          allow(TaskPolicy).to receive(:new).and_return(task_policy)
          sign_in(current_student)
        end

        let(:current_student) { create(:student) }
        let(:lesson) { create(:lesson, :published) }
        let(:lesson_session) { create(:lesson_session, lesson: lesson, student: current_student) }
        let(:task_policy) do
          instance_double(Students::TaskPolicy,
                          any?: true,
                          show?: true)
        end

        describe 'POST create' do
          context 'with valid' do
            before do
              allow(Flows::CreateLessonSession).to receive(:new).and_return(valid_session_creator)
              post :create, params: { lesson_id: lesson.id }, format: :json
            end
            let(:valid_session_creator) do
              instance_double(Flows::CreateLessonSession,
                              call: OpenStruct.new(success?: true, value: { lesson_session: lesson_session }))
            end

            it { is_expected.to respond_with(:ok) }
            it { is_expected.to render_template(:show) }
          end

          context 'with invalid' do
            before do
              allow(Flows::CreateLessonSession).to receive(:new).and_return(invalid_session_creator)
              post :create, params: { lesson_id: lesson.id }, format: :json
            end
            let(:invalid_session_creator) do
              instance_double(Flows::CreateLessonSession,
                              call: OpenStruct.new(success?: false))
            end
            it { is_expected.to respond_with(:unprocessable_entity) }
          end
        end
      end
    end
  end
end
