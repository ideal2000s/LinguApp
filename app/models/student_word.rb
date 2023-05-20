# frozen_string_literal: true

# == Schema Information
#
# Table name: student_words
#
#  id             :bigint           not null, primary key
#  student_id     :bigint           not null
#  word_id        :bigint
#  played_count   :integer          default(0)
#  solved_count   :integer          default(0)
#  last_played_at :datetime
#  last_failed_at :datetime
#  last_solved_at :datetime
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class StudentWord < ApplicationRecord
  belongs_to :student, inverse_of: :student_words
  belongs_to :word, class_name: 'Dictionary::Word', inverse_of: :student_words
  counter_culture :student
end
