# frozen_string_literal: true

require 'rails_helper'

module Admin
  RSpec.describe StudentBadgeGranter, type: :service do
    before { reward }

    let(:language) { languages(:english) }
    let(:reward) { create(:reward, language: language, kind: :badge, dimension: :word, value: 1) }
    let(:student) { create(:student) }

    describe '.call' do
      it 'does not create new StudentReward' do
        expect do
          described_class.call(student: student)
        end.to change(StudentReward, :count).by(0)
      end

      it 'creates new StudentReward' do
        allow(student).to receive(:student_words_count).and_return(1)
        expect do
          described_class.call(student: student)
        end.to change(StudentReward, :count).by(1)
      end
    end
  end
end
