# frozen_string_literal: true

# == Schema Information
#
# Table name: task_sessions
#
#  id                :bigint           not null, primary key
#  task_id           :bigint
#  lesson_session_id :bigint
#  status            :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  type              :string
#  duration          :integer
#
module Tasks
  class Email::TaskSession < ::TaskSession
    include TaskSessionRelations
  end
end
