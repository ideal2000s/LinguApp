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

class TaskItems::Email < TaskItem
  belongs_to :task,
             class_name: 'Tasks::Email',
             inverse_of: :items,
             touch: true
  has_rich_text :body
  store_accessor :context, :minimum_words, :subject, :from_email, :from_name
end
