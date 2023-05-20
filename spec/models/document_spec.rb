# frozen_string_literal: true

# == Schema Information
#
# Table name: documents
#
#  id                    :bigint           not null, primary key
#  task_item_id          :bigint
#  student_id            :bigint           not null
#  team_id               :bigint
#  content               :text
#  audio_data            :text
#  status                :integer          default("pending"), not null
#  context               :jsonb            not null
#  comments_count        :integer          default(0), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  student_assignment_id :integer
#  assignable_type       :string           not null
#  assignable_id         :bigint           not null
#

require 'rails_helper'

RSpec.describe Document, type: :model do
  describe 'model relations' do
    it { is_expected.to belong_to(:student) }
    it { is_expected.to belong_to(:assignable) }
    it { is_expected.to belong_to(:team).optional }
  end
end
