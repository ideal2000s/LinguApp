# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonMailer, type: :mailer do
  let(:author) { create(:user) }
  let(:lesson) { create(:lesson, title: 'Reviewable lesson', author: author) }

  describe '#new_lesson_review' do
    subject(:mail) { described_class.with(review: review).new_lesson_review }

    let(:review) { create(:lesson_review, lesson: lesson) }

    it 'renders the headers', aggregate_failures: true do
      expect(mail.subject).to eq(lesson.title)
      expect(mail.to).to eq([author.email])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match(review.content)
    end
  end
end
