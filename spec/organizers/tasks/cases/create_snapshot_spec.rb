# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::Cases::CreateSnapshot do
  subject(:result) { described_class.call(task: task, algorithm: :random) }

  let(:task) { FactoryBot.create(:select_text_task) }

  context 'when created' do
    it { is_expected.to be_success }
    it { expect(result.type).to eq(:ok) }
    it { expect { result }.to change(Task.snapshots, :count).by(1) }
    it { expect(result.value[:task]).to eq(task.snapshot_record) }
  end

  context 'when snapshot build failed' do
    before do
      allow(Tasks::SnapshotBuilder).to receive(:create!)
    end

    it { is_expected.to be_failure }
    it { expect(result.type).to eq(:snapshot_builder_failure) }
    it { expect(result.value).to eq(:snapshot_builder_failure) }
  end
end
