# frozen_string_literal: true

# == Schema Information
#
# Table name: task_items
#
#  id           :bigint           not null, primary key
#  task_id      :bigint
#  type         :string           not null
#  context      :jsonb            not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  position     :integer          default(0), not null
#  translations :jsonb
#

require 'rails_helper'

RSpec.describe TaskItems::AudioDialogue do
  describe '#assign_position' do
    subject(:item) { described_class.new(task: task) }

    let(:task) { create(:audio_dialogue_task) }

    describe 'no items in task' do
      before { item.save }

      it 'has initial position of 0' do
        expect(item.position).to eq(1)
      end
    end

    describe 'some items in task' do
      before do
        create_list(:audio_dialogue_item, initial_items_count, task: task)
        item.save
      end

      let(:initial_items_count) { 4 }

      it 'has initial position of count items + 1' do
        expect(item.position).to eq(initial_items_count + 1)
      end
    end
  end
end
