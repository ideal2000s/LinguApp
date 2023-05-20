# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Tasks::Cases::Update do
  subject(:result) { described_class.call(task: task, form: form) }

  before do
    allow(task).to receive(:update).with(params).and_return(saved?)
    allow(form).to receive(:attributes).and_return(params)
  end

  let(:task) { create(:select_text_task) }
  let(:form) { task.form.new(params) }
  let(:params) { { name: 'Wow! Task!' } }

  context 'when valid' do
    let(:saved?) { true }

    it { is_expected.to be_success }

    it 'returns type :ok' do
      expect(result.type).to eq(:ok)
    end

    it 'returns task and form' do
      expect(result.value).to eq(form: form, task: task)
    end
  end

  context 'when invalid' do
    let(:saved?) { false }

    it { is_expected.to be_failure }

    it 'returns type :update_error' do
      expect(result.type).to eq(:update_error)
    end

    it 'returns form back' do
      expect(result.value).to eq(form: form, task: task, lesson: task.lesson)
    end
  end
end
