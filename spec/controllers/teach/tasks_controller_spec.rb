# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::TasksController, type: :controller do
  before do
    allow(Tasks::CreateForm).to receive(:new).and_return(task_form)
    allow(Task).to receive(:create).and_return(task)
    sign_in(current_user)
    team_user
  end

  let(:current_user) { create(:user, :with_admin_role) }
  let(:lesson) { create(:lesson, author: current_user) }
  let(:team_user) { create(:team_user, team: lesson.team, user: current_user, default: true) }

  let(:params) do
    {
      name: 'Task',
      type: Task.types.first,
      complexity: Task.complexities.keys.first,
      performance: 0.5
    }
  end
  let(:task_form) { instance_double(Tasks::CreateForm) }
  let(:task) { create(:select_text_task, lesson: lesson) }

  describe 'GET #new' do
    before { get :new, params: { lesson_id: lesson.id }, xhr: true }

    it { is_expected.to respond_with(200) }
    it { is_expected.to render_template(:new) }
  end

  describe 'POST #create' do
    context 'with valid params' do
      before do
        allow(task_form).to receive(:valid?).and_return(true)
        allow(task_form).to receive(:attributes)
        post :create, params: { lesson_id: lesson.id, task: params }
      end

      it { is_expected.to respond_with(:found) }
    end

    context 'with invalid params' do
      before do
        allow(task_form).to receive(:valid?).and_return(false)
        post :create, params: { lesson_id: lesson.id, task: params }
      end

      it { is_expected.to respond_with(:unprocessable_entity) }
      it { is_expected.to render_template(:new) }
    end
  end

  describe 'GET #edit' do
    before do
      get :edit, params: { lesson_id: lesson.id, id: task.id }
    end

    it { is_expected.to respond_with(:ok) }
    it { is_expected.to render_template(:edit) }
  end

  describe 'PUT #update' do
    before do
      allow(Teach::Tasks::Flows::Update).to receive(:call).and_return(result)
      put :update, params: { lesson_id: lesson.id, id: task.id, task: params }
    end

    let(:result) do
      instance_double('Micro::Case::Result', success?: success?, value: {
                        task: task, form: task_form
                      })
    end

    context 'when successful' do
      let(:success?) { true }

      it { is_expected.to respond_with(:found) }
      it { is_expected.to redirect_to(edit_teach_lesson_task_path(lesson.id, task.id)) }
    end

    context 'when failure' do
      let(:success?) { false }

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:edit) }
    end
  end

  describe 'GET #show' do
    before do
      get :show, params: { lesson_id: lesson.id, id: task.id }
    end

    it { is_expected.to respond_with(:found) }
    it { is_expected.to redirect_to(teach_task_preview_path(task)) }
  end
end
