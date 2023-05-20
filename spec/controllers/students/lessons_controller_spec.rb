# frozen_string_literal: true

require 'rails_helper'

module Students
  RSpec.describe LessonsController, type: :controller do
    describe 'GET #index' do
      before do
        get :index
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:static) }
    end

    describe 'GET #show' do
      context 'when lesson exists' do
        before do
          get :show, params: { id: lesson.id }
        end

        let(:lesson) { create(:lesson, :published) }

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template(:show) }
      end

      context 'when lesson not exists' do
        let(:lesson_id) { Faker::Number.number }

        it 'raises ActiveRecord::RecordNotFound exception' do
          expect { get(:show, params: { id: lesson_id }) }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end
  end
end
