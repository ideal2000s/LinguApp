# frozen_string_literal: true

# == Schema Information
#
# Table name: student_solutions
#
#  id            :bigint           not null, primary key
#  solution      :jsonb            not null
#  task_snapshot :jsonb            not null
#  correct       :boolean          default(FALSE)
#  score         :integer
#  discarded_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryBot.define do
  factory :student_solution do
    solution { '' }
    task_snapshot { '' }
    correct { false }
    score { 1 }
    discarded_at { '2019-07-30 11:57:30' }
  end
end
