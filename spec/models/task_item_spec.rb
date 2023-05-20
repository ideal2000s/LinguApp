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

RSpec.describe TaskItem, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:task) }
  end

  describe 'Model versioning' do
    it { is_expected.to be_versioned }
  end
end
