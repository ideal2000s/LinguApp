# frozen_string_literal: true

# == Schema Information
#
# Table name: ratings
#
#  id         :bigint           not null, primary key
#  student_id :bigint           not null
#  lesson_id  :bigint           not null
#  rate       :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Rating, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:lesson) }
    it { is_expected.to belong_to(:student) }
  end

  describe 'Model validations' do
    it { is_expected.to validate_numericality_of(:rate).only_integer }
    it { is_expected.to validate_inclusion_of(:rate).in_array([1, 2, 3, 4, 5]) }
  end
end
