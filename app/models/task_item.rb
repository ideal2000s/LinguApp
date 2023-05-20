# frozen_string_literal: true

# == Schema Information
#
# Table name: task_items
#
#  id           :bigint           not null, primary key
#  task_id      :bigint
#  type         :string           not null
#  context      :jsonb            not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  position     :integer          default(0), not null
#  translations :jsonb
#

class TaskItem < ApplicationRecord
  belongs_to :task, inverse_of: :items
  has_one :lesson, through: :task

  has_many :options, class_name: 'TaskItemOption', dependent: :destroy
  has_many :task_item_sessions, dependent: :destroy
  has_one :document, dependent: :destroy

  has_paper_trail unless: proc { |record| record.task&.snapshot? }

  def self.form
    const_get(:Form)
  end

  def readonly?
    persisted? && task.snapshot?
  end

  def functional?
    true
  end
end
