# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::CreateForm, type: :model do
  describe '#perform' do
    let(:lesson) { create(:lesson) }
    let(:valid_params) do
      {
        lesson_id: lesson.id,
        name: 'Task',
        type: Task.types.first,
        complexity: Task.complexities.keys.first,
        subject: Task.subjects.keys.first
      }
    end
    let(:invalid_params) { valid_params.merge(name: nil) }

    context 'when Task form valid' do
      subject(:task_form) { described_class.new(valid_params) }

      it 'saves Task form instance' do
        expect(task_form.save).to eq(true)
      end

      it 'inserts new Task record' do
        expect { task_form.save }.to change(Task, :count).by(1)
      end
    end

    context 'when Task form invalid' do
      subject(:task_form) { described_class.new(invalid_params) }

      it 'does not save Task form instance' do
        expect(task_form.save).to eq(false)
      end
    end
  end

  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_inclusion_of(:complexity).in_array(Task.complexities.keys) }
    # it { is_expected.to validate_inclusion_of(:performance).in_range(0.01..1) }
  end
end
