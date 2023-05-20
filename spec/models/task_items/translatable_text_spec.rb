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

RSpec.describe TaskItems::TranslatableText do
  subject(:item) { described_class.new(task: task, translations: translations) }

  let(:task) { create(:translatable_text_task) }
  let(:translations) { { 'en': 'translation for item' } }

  context 'when content not changed' do
    it 'does not empty item translations' do
      item.save
      expect(item.translations).to eq(translations.stringify_keys)
    end
  end

  context 'when content changed' do
    it 'empties item translations' do
      item.update(content: 'content')
      expect(item.translations).to eq({})
    end
  end
end
