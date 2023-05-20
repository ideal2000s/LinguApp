# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Tasks::Cases::Create do
  subject(:result) { described_class.call(form: form) }

  before do
    allow(Task).to receive(:create).with(params).and_return(task)
  end

  let(:form) { instance_double('Tasks::Create Form', attributes: params) }
  let(:params) { { title: 'Wow! Title!' } }

  context 'when created' do
    let(:task) { create(:select_text_task) }

    it { is_expected.to be_success }

    it 'returns type :ok' do
      expect(result.type).to eq(:ok)
    end

    it 'returns task and form back' do
      expect(result.value).to eq(task: task, form: form)
    end
  end

  context 'when not created' do
    let(:task) { nil }

    it { is_expected.to be_failure }

    it 'returns type :create_error' do
      expect(result.type).to eq(:create_error)
    end

    it 'returns form object' do
      expect(result.value).to eq(form: form, task: task)
    end
  end
end
