# frozen_string_literal: true

# == Schema Information
#
# Table name: student_target_languages
#
#  id          :bigint           not null, primary key
#  student_id  :bigint
#  language_id :bigint
#  level       :integer          default("undefined"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe StudentTargetLanguage, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:language) }
    it { is_expected.to belong_to(:student) }
  end
end
