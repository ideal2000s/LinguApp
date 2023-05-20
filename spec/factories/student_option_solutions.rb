# frozen_string_literal: true

# == Schema Information
#
# Table name: student_option_solutions
#
#  id                       :bigint           not null, primary key
#  task_item_option_id      :bigint           not null
#  student_item_solution_id :bigint           not null
#  context                  :jsonb
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#

FactoryBot.define do
  factory :student_option_solution do
    task_item_option { nil }
    item { nil }
    answer { false }
  end
end
