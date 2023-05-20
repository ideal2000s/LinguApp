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

RSpec.describe TaskItems::FillInBlanks do
  describe '#answers' do
    subject(:answers) { described_class.new(question: question).answers }

    context 'with many options' do
      let(:question) { 'John *speaks:talks:writes* English with his friend' }

      it { is_expected.to eq([%w[speaks talks writes]]) }
    end

    context 'with one option' do
      let(:question) { 'Lorem *ipsum* dolor *sit:sim*' }

      it { is_expected.to eq([%w[ipsum], %w[sit sim]]) }
    end
  end
end
