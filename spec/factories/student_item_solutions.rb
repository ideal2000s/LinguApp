# frozen_string_literal: true

# == Schema Information
#
# Table name: student_item_solutions
#
#  id                  :bigint           not null, primary key
#  task_item_id        :bigint           not null
#  student_solution_id :bigint           not null
#  context             :jsonb
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

FactoryBot.define do
  factory :student_item_solution do
    task_item { nil }
    student_solution { nil }
    answer { '' }
    answers { [] }
  end
end
