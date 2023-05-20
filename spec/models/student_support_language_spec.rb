# frozen_string_literal: true

# == Schema Information
#
# Table name: student_support_languages
#
#  id          :bigint           not null, primary key
#  student_id  :bigint           not null
#  language_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe StudentSupportLanguage, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:language) }
    it { is_expected.to belong_to(:student) }
  end
end
