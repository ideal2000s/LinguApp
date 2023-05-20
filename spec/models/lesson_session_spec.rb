# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_sessions
#
#  id                      :bigint           not null, primary key
#  lesson_id               :bigint
#  student_id              :bigint
#  current_task_session_id :bigint
#  status                  :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  progress                :jsonb
#  duration                :integer
#
require 'rails_helper'

RSpec.describe LessonSession, type: :model do
  it { is_expected.to belong_to(:lesson) }
  it { is_expected.to belong_to(:student) }

  describe '#progress_percent' do
    let(:session) { create(:lesson_session) }

    it 'returns 0 by default' do
      expect(session.progress_percent).to be_zero
    end
  end
end
