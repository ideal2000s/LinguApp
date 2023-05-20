# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::SnapshotsWatchdog do
  let(:task) { create(:select_text_task) }
  let(:old_snapshot_task) { create(:fill_in_blanks_task) }
  let(:no_snapshot_task) { create(:true_false_task) }
  let(:task_snapshot) { Tasks::SnapshotBuilder.create!(task: task) }

  before do
    allow(Tasks::PerformanceUpdaterJob).to receive(:perform_later)

    no_snapshot_task
    task_snapshot
    described_class.new.call
  end

  it 'calls updater job only for new snapshots' do
    expect(Tasks::PerformanceUpdaterJob).to have_received(:perform_later).once.with(task)
  end
end
