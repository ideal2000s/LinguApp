# frozen_string_literal: true

require 'rails_helper'

module Teach::Tasks
  RSpec.describe PreviewsController, type: :controller do
    let(:user) { create(:user, :with_default_team) }
    let(:task) { build_stubbed(:select_text_task) }
    let(:scope_class) { PreviewPolicy::Scope }
    let(:scope_double) { instance_double(scope_class, resolve: Task) }

    before do
      allow(scope_class).to receive(:new).and_return(scope_double)
      allow(Task).to receive(:find).and_return(task)
      sign_in(user)
    end

    describe '#show' do
      context 'when html' do
        before { get :show, params: { task_id: task.id } }

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template('teach/tasks/previews/show') }
      end

      context 'when json' do
        before { get :show, params: { task_id: task.id }, format: :json }

        it { is_expected.to respond_with(:ok) }
        it { is_expected.to render_template('students/api/tasks/show') }
      end
    end
  end
end
