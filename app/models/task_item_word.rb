# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_words
#
#  id           :bigint           not null, primary key
#  task_item_id :bigint
#  word_id      :bigint
#
class TaskItemWord < ApplicationRecord
  belongs_to :task_item
  belongs_to :word, class_name: 'Dictionary::Word'
end
