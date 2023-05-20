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
require 'rails_helper'

RSpec.describe TaskSession, type: :model do
  subject { create(:task_session) }

  it { is_expected.to belong_to(:task).inverse_of(:task_sessions) }
  it { is_expected.to belong_to(:lesson_session).inverse_of(:task_sessions) }
  it { is_expected.to validate_uniqueness_of(:task).scoped_to(:lesson_session_id) }
end
