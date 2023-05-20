# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_options
#
#  id           :bigint           not null, primary key
#  task_item_id :bigint
#  correct      :boolean
#  text_option  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  context      :jsonb            not null
#  type         :string
#
require 'rails_helper'

RSpec.describe TaskItemOptions::FillInTable, type: :model do
  subject(:model) { described_class.new }

  let(:params_schema) { %i[correct answer] }

  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:answer) }
  end

  describe '#params_schema' do
    subject { model.params_schema }

    it { is_expected.to eq(params_schema) }
  end

  describe '.params_schema' do
    subject { described_class.params_schema }

    it { is_expected.to eq(params_schema) }
  end
end
