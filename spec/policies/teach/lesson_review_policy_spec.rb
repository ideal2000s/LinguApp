# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonReviewPolicy do
  subject(:policy) { described_class }

  let(:lesson) { Lesson.new }
  let(:record) { LessonReview.new(lesson: lesson) }
  let(:user) { team_user }
  let(:user_record) { create(:user) }
  let(:team_user) { create(:team_user, role: :member, user: user_record) }

  describe 'with member role' do
    include_examples 'grant policy rule', :index?
    include_examples 'grant policy rule', :create?
    include_examples 'reject policy rule', :destroy?

    context 'when authored review' do
      let(:record) { LessonReview.new(author: user_record, lesson: lesson) }

      include_examples 'grant policy rule', :destroy?
    end

    context 'when own lesson' do
      let(:lesson) { Lesson.new(author: user_record) }

      include_examples 'grant policy rule', :index?
      include_examples 'reject policy rule', :create?
      include_examples 'reject policy rule', :destroy?
    end
  end
end
