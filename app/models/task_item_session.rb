# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_sessions
#
#  id              :bigint           not null, primary key
#  task_session_id :bigint
#  task_item_id    :bigint
#  data            :jsonb
#  answer          :jsonb
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  completed       :boolean          default(FALSE)
#  attempts_count  :integer          default(0), not null
#  type            :string           not null
#  correct         :boolean
#
class TaskItemSession < ApplicationRecord
  belongs_to :task_item
  belongs_to :task_session

  validate :increased_attempts_count

  def self.precreate_from_item!(item)
    create!(task_item: item)
  end

  private

  def increased_attempts_count
    errors.add(:attempts_count, :cannot_be_lower_than, attempts_count: attempts_count_was) if attempts_count < attempts_count_was
  end
end
