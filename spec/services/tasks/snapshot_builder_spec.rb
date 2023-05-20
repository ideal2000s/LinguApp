# frozen_string_literal: true

RSpec.describe Tasks::SnapshotBuilder do
  subject(:builder) { described_class.new(task: task) }

  shared_examples 'SnapshotBuilder' do |type|
    describe "creates snapshot of #{type} type" do
      let(:task) { FactoryBot.create(type) }

      it 'successfully' do
        expect { builder.create! }.to(
          change(Task.snapshots, :count).by(1)
        )
      end
    end
  end

  it_behaves_like 'SnapshotBuilder', :arrange_words_task
  it_behaves_like 'SnapshotBuilder', :audio_task
  it_behaves_like 'SnapshotBuilder', :audio_dialogue_task
  it_behaves_like 'SnapshotBuilder', :essay_task
  it_behaves_like 'SnapshotBuilder', :fill_in_blanks_task
  it_behaves_like 'SnapshotBuilder', :inline_dropdown_task
  it_behaves_like 'SnapshotBuilder', :mark_word_task
  it_behaves_like 'SnapshotBuilder', :select_image_task
  it_behaves_like 'SnapshotBuilder', :select_text_task
  it_behaves_like 'SnapshotBuilder', :true_false_task
  it_behaves_like 'SnapshotBuilder', :sms_task
end
