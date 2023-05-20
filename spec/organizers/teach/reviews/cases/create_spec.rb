# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Reviews::Cases::Create do
  subject(:result) { described_class.call(params: review_attributes, scope: LessonReview) }

  let(:reviewer) { create(:user) }
  let(:lesson) { create(:lesson) }

  describe 'with valid review params' do
    let(:review_attributes) { attributes_for :lesson_review, lesson_id: lesson.id, author_id: reviewer.id }

    it 'returns successful result' do
      expect(result).to be_success
    end

    it 'updates number of credits' do
      expect { result }.to change(LessonReview, :count).by(1)
    end
  end

  describe 'with invalid review params'
end
