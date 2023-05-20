# frozen_string_literal: true

# == Schema Information
#
# Table name: skills
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  name_translations :jsonb            not null
#

require 'rails_helper'

RSpec.describe Skill, type: :model do
  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'Model relations' do
    it { is_expected.to have_many(:lesson_skills) }
    it { is_expected.to have_many(:lessons).through(:lesson_skills) }
  end
end
