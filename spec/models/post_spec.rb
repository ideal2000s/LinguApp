# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id             :bigint           not null, primary key
#  content        :text             not null
#  team_id        :bigint           not null
#  author_id      :bigint           not null
#  lesson_id      :bigint
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  discarded_at   :datetime
#  likes_count    :integer          default(0), not null
#  comments_count :integer          default(0), not null
#
require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:content) }
  end

  describe 'Model relations' do
    it { is_expected.to belong_to(:team) }
    it { is_expected.to belong_to(:author) }
    it { is_expected.to belong_to(:lesson).optional }
    it { is_expected.to have_many(:comments) }
    it { is_expected.to have_many(:post_likes) }
  end
end
