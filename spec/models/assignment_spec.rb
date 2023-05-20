# frozen_string_literal: true

# == Schema Information
#
# Table name: assignments
#
#  id          :bigint           not null, primary key
#  team_id     :bigint           not null
#  language_id :bigint           not null
#  name        :string           default(""), not null
#  context     :integer          default("text"), not null
#  instruction :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Assignment, type: :model do
  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:instruction) }
  end

  describe 'Associations' do
    it { is_expected.to belong_to(:language) }
    it { is_expected.to belong_to(:team) }

    it { is_expected.to have_many(:student_assignments) }
    it { is_expected.to have_many(:students).through(:student_assignments) }
  end
end
