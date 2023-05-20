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
FactoryBot.define do
  factory :student_word do
    student
    word { create(:dictionary_word) }
  end
end
