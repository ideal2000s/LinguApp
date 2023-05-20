# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::Cases::FindSnapshot do
  subject(:result) { described_class.call(task: task, algorithm: :random) }

  context 'when snapshot exists' do
    let(:task) { FactoryBot.create(:select_text_task, :with_snapshot) }

    it { is_expected.to be_failure }
    it { expect(result.type).to eq(:ok) }
    it { expect(result.value[:task]).to eq(task.snapshot_record) }
  end

  context 'when no snapshot' do
    let(:task) { FactoryBot.create(:select_text_task) }

    it { is_expected.to be_success }
    it { expect(result.type).to eq(:ok) }
    it { expect(result.value[:task]).to eq(task) }
  end
end
