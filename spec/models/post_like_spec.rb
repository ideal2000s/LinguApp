# frozen_string_literal: true

# == Schema Information
#
# Table name: post_likes
#
#  id         :bigint           not null, primary key
#  student_id :bigint           not null
#  post_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe PostLike, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:student) }
    it { is_expected.to belong_to(:post) }
  end
end
