# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_options
#
#  id           :bigint           not null, primary key
#  task_item_id :bigint
#  correct      :boolean
#  text_option  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  context      :jsonb            not null
#  type         :string
#

FactoryBot.define do
  factory :select_image_item_option, parent: :task_item_option, class: 'TaskItemOptions::SelectImage' do
    correct { false }
  end
end
