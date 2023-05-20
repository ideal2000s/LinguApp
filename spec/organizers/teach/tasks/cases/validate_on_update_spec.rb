# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Tasks::Cases::ValidateOnUpdate do
  subject(:result) { described_class.call(task: task, params: params) }

  before do
    allow(task.form).to receive(:new).and_return(form)
    allow(form).to receive(:valid?).and_return(valid?)
  end

  let(:params) { {} }
  let(:task) { create(:select_text_task) }
  let(:form) { task.form.new(params) }

  context 'when valid' do
    let(:valid?) { true }

    it { is_expected.to be_success }

    it 'has type :ok' do
      expect(result.type).to eq(:ok)
    end

    it 'returns form object' do
      expect(result.value).to eq(form: form, task: task)
    end
  end

  context 'when invalid' do
    let(:valid?) { false }

    it { is_expected.to be_failure }

    it 'has type :validation_error' do
      expect(result.type).to eq(:validation_error)
    end

    it 'returns form object' do
      expect(result.value).to eq(form: form, task: task, lesson: task.lesson)
    end
  end
end
