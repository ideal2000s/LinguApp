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

require 'spec_helper'

RSpec.describe TaskItems::MarkWord do
  subject(:item) { described_class.new(params) }

  let(:params) { {} }

  describe '#prepared_statement' do
    shared_examples 'MarkWord sentence builder' do |statement, prepared|
      subject(:prepared_statement) { item.prepared_statement }

      let(:params) { { statement: statement } }

      it { expect(prepared_statement).to eq(prepared.map(&:stringify_keys)) }
    end

    it_behaves_like 'MarkWord sentence builder', '*Det* går veldig *bra*!!!', [
      { word: 'Det', disabled: false, solution: true },
      { word: ' ', disabled: true, solution: false },
      { word: 'går', disabled: false, solution: false },
      { word: ' ', disabled: true, solution: false },
      { word: 'veldig', disabled: false, solution: false },
      { word: ' ', disabled: true, solution: false },
      { word: 'bra', disabled: false, solution: true },
      { word: '!!!', disabled: true, solution: false }
    ]

    it_behaves_like 'MarkWord sentence builder', "he's *good*, *4-years* boy!", [
      { word: "he's", disabled: false, solution: false },
      { word: ' ', disabled: true, solution: false },
      { word: 'good', disabled: false, solution: true },
      { word: ', ', disabled: true, solution: false },
      { word: '4-years', disabled: false, solution: true },
      { word: ' ', disabled: true, solution: false },
      { word: 'boy', disabled: false, solution: false },
      { word: '!', disabled: true, solution: false }
    ]
  end

  describe 'connect to dictionary words' do
    subject(:item) { create :mark_word_item, task: task, statement: statement }

    let(:lesson) { create :lesson }
    let(:task) { create :mark_word_task }
    let(:statement) { 'one *two* three' }
    let(:word) { create :dictionary_word, body: 'two', language: lesson.language }

    before { word }

    specify 'connects to Dictionary::Word' do
      expect(item.task_item_words.length).to eq(1)
    end
  end
end
