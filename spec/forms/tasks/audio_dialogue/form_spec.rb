# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::AudioDialogue::Form, type: :model do
  let(:valid_params) do
    {
      name: 'Audio Dialogue',
      introduction: 'Introduction',
      score_method: 'manual',
      complexity: Task.complexities.keys.first,
      subject: Task.subjects.keys.first
    }
  end

  it { is_expected.to validate_presence_of(:name) }

  describe '#persist!' do
    context 'when AudioDialogueTask form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it { expect(task_form.valid?).to eq(true) }
    end
  end

  describe 'Model validations' do
    subject { described_class.new(task: Task.new) }

    it { is_expected.to validate_presence_of(:name) }
  end
end
