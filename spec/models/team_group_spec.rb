# frozen_string_literal: true

# == Schema Information
#
# Table name: team_groups
#
#  id                  :bigint           not null, primary key
#  team_id             :bigint
#  language_id         :bigint
#  name                :string           not null
#  level               :integer          not null
#  discarded_at        :datetime
#  archived_at         :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  team_students_count :integer          default(0), not null
#  joinable            :boolean          default(TRUE), not null
#  course_id           :integer
#
require 'rails_helper'

RSpec.describe TeamGroup, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:language) }
    it { is_expected.to belong_to(:team) }
    it { is_expected.to belong_to(:course).optional(true) }
    it { is_expected.to have_many(:team_students) }
    it { is_expected.to have_many(:unarchived_team_students) }
    it { is_expected.to have_many(:students).through(:unarchived_team_students).source(:student) }
  end

  describe 'Model validations' do
    subject(:team_group) { create(:team_group, team: team) }

    let(:team) { create(:team) }

    it { is_expected.to validate_presence_of(:team) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:team_id) }
  end
end
