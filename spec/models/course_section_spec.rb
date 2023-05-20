# frozen_string_literal: true

# == Schema Information
#
# Table name: course_sections
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string           default(""), not null
#  position   :integer          default(0), not null
#
require 'rails_helper'

RSpec.describe CourseSection, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:course) }

    it { is_expected.to have_many(:lessons) }
  end
end
