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

RSpec.describe TaskItems::SelectVideo do
  subject(:item) { described_class.new(params) }

  describe 'without video' do
    let(:params) { {} }

    it { is_expected.not_to be_functional }
  end
end
