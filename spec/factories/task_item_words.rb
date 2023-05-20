# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_words
#
#  id           :bigint           not null, primary key
#  task_item_id :bigint
#  word_id      :bigint
#
FactoryBot.define do
  factory :task_item_word do
    association :word
  end
end
