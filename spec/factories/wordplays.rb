# frozen_string_literal: true

# == Schema Information
#
# Table name: wordplays
#
#  id          :bigint           not null, primary key
#  word_id     :bigint
#  gameplay_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :wordplay do
    word
    gameplay
  end
end
