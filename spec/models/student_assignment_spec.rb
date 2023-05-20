# frozen_string_literal: true

# == Schema Information
#
# Table name: student_assignments
#
#  id            :bigint           not null, primary key
#  assignment_id :bigint           not null
#  student_id    :bigint           not null
#  passed_at     :datetime
#  deadline      :datetime
#  status        :integer          default("pending"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'rails_helper'

RSpec.describe StudentAssignment, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:assignment) }
    it { is_expected.to belong_to(:student) }
  end
end
