# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Reviews::Cases::AwardCredits do
  subject(:result) { described_class.call(review: review) }

  let(:reviewer) { create(:user) }
  let(:lesson) { create(:lesson) }
  let(:review) { create(:lesson_review, lesson: lesson, author: reviewer) }

  describe 'with valid review params' do
    it 'updates reviewer credits' do
      expect { result }.to change { reviewer.reload.credits }.by(Lesson::REVIEW_REWARD)
    end
  end

  describe 'with invalid review params'
end
