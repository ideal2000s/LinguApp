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

RSpec.describe TaskItems::FillGap do
  subject(:item) { described_class.new(task: task, statement: statement) }

  let(:task) { create(:fill_gap_task) }
  let(:statement) { 'Once I saw *select:one/two/three* tree.' }

  describe '#clean_statement' do
    subject(:clean_statement) { item.clean_statement }

    it 'matches regexp' do
      expect(clean_statement).to eq('Once I saw ** tree.')
    end
  end

  describe '#answers' do
    subject(:first_answer) { item.answers.first }

    it { is_expected.to match_array(%w[one two three]) }
  end

  describe '#correct_answers' do
    subject(:correct_answers) { item.correct_answers }

    let(:statement) { 'Once I saw *select:one/two/three* tree. It was *select:huge/wide*.' }

    it { is_expected.to eq(%w[one huge]) }
  end
end
