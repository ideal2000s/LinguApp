# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_reviews
#
#  id         :bigint           not null, primary key
#  lesson_id  :bigint
#  author_id  :bigint
#  status     :integer
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe LessonReview, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:lesson) }
  end
end
