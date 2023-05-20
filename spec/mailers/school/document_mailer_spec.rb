# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::DocumentMailer, type: :mailer do
  let(:student) { create(:student, locale: :en) }
  let(:lesson) { create(:lesson, title: 'Reviewable lesson', author: author) }
  let(:essay) { create(:essay_task, lesson: lesson) }
  let(:document) { create(:document, assignable: essay, student: student) }

  describe '#new_document_comment' do
    subject(:mail) { described_class.with(comment: comment).new_document_comment }

    let(:author) { create(:user) }
    let(:comment) { create(:comment, commentable: document, author: author) }

    it 'renders the headers', aggregate_failures: true do
      expect(mail.to).to eq([student.email])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match(essay.name)
      expect(mail.body.encoded).to match(comment.content)
      expect(mail.body.encoded).to match(author.full_name)
    end
  end
end
