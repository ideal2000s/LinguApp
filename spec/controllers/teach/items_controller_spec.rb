# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::ItemsController, type: :controller do
  subject { response }

  before do
    allow(Task).to receive(:create).and_return(task)
    allow(Task).to receive(:find).with('1').and_return(task)
    sign_in(current_user)
    team_user
  end

  let(:current_user) { create(:user, :with_admin_role) }
  let(:lesson) { create(:lesson, author: current_user) }
  let(:team_user) { create(:team_user, user: current_user, default: true, team: lesson.team) }
  let(:task) { OpenStruct.new(id: 1, items: items, lesson_id: 1, lesson: lesson) }
  let(:items) { double(:items, form: form, create: item, new: item) }
  let(:item) { instance_double('Item') }
  let(:form) { double(:item_form, new: form_instance, params_schema: []) }
  let(:form_instance) { instance_double('item_form', valid?: valid?) }
  let(:valid?) { true }
  let(:params) { { task_id: task.id } }

  describe 'POST #create' do
    before do
      allow(form_instance).to receive(:attributes)
      post :create, params: params
    end

    let(:params) { super().merge(task_item: { bla: 'bla' }) }

    context 'with valid params' do
      it { is_expected.to have_http_status(:found) }
    end

    context 'with invalid params' do
      let(:valid?) { false }

      it { is_expected.to have_http_status(:found) }
    end
  end
end
