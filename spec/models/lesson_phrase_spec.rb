# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_phrases
#
#  id         :bigint           not null, primary key
#  lesson_id  :bigint
#  phrase_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe LessonPhrase, type: :model do
  describe 'Associations' do
    it { is_expected.to belong_to(:lesson) }
    it { is_expected.to belong_to(:phrase) }
  end
end
