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

RSpec.describe TaskItems::WordGames do
  let(:task) { create(:word_games_task) }

  describe 'item' do
    let(:item) { task.items.first }

    it 'is enabled by default' do
      expect(item).to be_enabled
    end

    it 'restricts game type', aggregate_failures: true do
      item.update(game_type: 'foo')

      expect(item).to be_invalid
      expect(item.errors[:game_type]).to include('is not included in the list')
    end

    it 'forbids game type modification', aggregate_failures: true do
      item.update(game_type: 'waterfall')

      expect(item).to be_invalid
      expect(item.errors[:game_type]).to include('readonly')
    end

    it 'forbids game type duplicates', aggregate_failures: true do
      item = task.items.build(game_type: 'flashcard')

      expect(item).to be_invalid
      expect(item.errors[:game_type]).to include('unique')
      expect { item.save!(validate: false) }.to raise_error(ActiveRecord::RecordNotUnique)
    end

    it 'is undestroyable' do
      item.destroy
      expect(item).not_to be_destroyed
    end

    it 'updates enabled' do
      expect { item.update!(enabled: false) }.to(change { item.reload.enabled })
    end
  end

  describe 'first item' do
    let(:item) { task.items.first }

    it 'is flashcard' do
      expect(item.game_type).to eq('flashcard')
    end

    it 'is not movable up' do
      expect(item).not_to be_movable_up
    end

    it 'is not movable down' do
      expect(item).not_to be_movable_down
    end

    it 'allows to pass position 1 for flashcard' do
      item.position_will_change!

      expect(item).to be_valid
    end

    it 'ignores first move lower' do
      expect { item.move_lower }.not_to(change { item.reload.position })
    end
  end

  describe 'another item' do
    let(:item) { task.items.second }

    it 'ignores second move higher' do
      expect { item.move_higher }.not_to(change { item.reload.position })
    end
  end
end
