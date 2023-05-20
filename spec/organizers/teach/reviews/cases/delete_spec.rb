# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Reviews::Cases::Delete do
  subject(:result) { described_class.call(review: review) }

  let(:reviewer) { create(:user) }
  let(:lesson) { create(:lesson) }
  let(:review) { create(:lesson_review, lesson: lesson, author: reviewer) }

  describe 'delete review' do
    before { review }

    it 'destroys a review' do
      expect { result }.to change(LessonReview, :count).by(-1)
    end
  end
end
