# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  content          :string           not null
#  commentable_type :string           not null
#  commentable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  author_type      :string           not null
#  author_id        :bigint           not null
#  audio_data       :text
#
require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:commentable) }
    it { is_expected.to belong_to(:author) }
  end
end
