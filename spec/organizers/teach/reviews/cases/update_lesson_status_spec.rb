# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Reviews::Cases::UpdateLessonStatus do
  subject(:result) { described_class.call(review: review) }

  let(:lesson) { create(:lesson, status: :pending) }

  context 'with approval review' do
    let(:review) { create(:lesson_review, lesson: lesson, status: :approved) }

    it 'approves a lesson' do
      expect { result }.to change(lesson, :status).to('approved')
    end
  end

  context 'with rejected review' do
    let(:review) { create(:lesson_review, lesson: lesson, status: :rejected) }

    it 'does not approves a lesson' do
      expect { result }.not_to change(lesson, :status)
    end
  end

  context 'with previous approval review and following reject review' do
    let(:review_approved) { create(:lesson_review, lesson: lesson, status: :approved) }
    let(:review) { create(:lesson_review, lesson: lesson, status: :rejected) }

    before do
      review_approved
      result # run it once for first review
    end

    it 'does not change previous status' do
      expect { result }.not_to change(lesson, :status)
    end

    it 'stays approved' do
      expect(lesson.status).to eq('approved')
    end
  end
end
