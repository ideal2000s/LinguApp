# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Tasks::Cases::ValidateOnCreate do
  subject(:result) { described_class.call(task: task, params: params) }

  before do
    allow(::Tasks::CreateForm).to receive(:new).and_return(form)
  end

  let(:form) { instance_double('Tasks::CreateForm', valid?: valid?) }

  let(:params) { {} }
  let(:task) { create(:select_text_task) }

  context 'when valid' do
    let(:valid?) { true }

    it { is_expected.to be_success }
    it { expect(result.type).to eq(:ok) }
    it { expect(result.value).to eq(form: form) }
  end

  context 'when invalid' do
    let(:valid?) { false }

    it { is_expected.to be_failure }

    it 'has type :validation_error' do
      expect(result.type).to eq(:validation_error)
    end

    it 'returns form object' do
      expect(result.value).to eq(form: form)
    end
  end
end
