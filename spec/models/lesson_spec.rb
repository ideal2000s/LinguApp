# frozen_string_literal: true

# == Schema Information
#
# Table name: lessons
#
#  id                  :bigint           not null, primary key
#  author_id           :bigint
#  title               :string
#  discarded_at        :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  objectives          :string           default([]), not null, is an Array
#  kind                :integer          default("tet"), not null
#  level               :integer          default("undefined"), not null
#  meta                :jsonb            not null
#  published           :boolean          default(FALSE), not null
#  parent_id           :integer
#  language_id         :bigint
#  support_language_id :bigint
#  status              :integer          default("draft"), not null
#  team_id             :integer
#  tags                :string           default([]), is an Array
#  image_data          :text
#  ratings_count       :integer          default(0), not null
#  total_rating        :integer          default(0), not null
#  phrases_count       :integer          default(0)
#  average_duration    :integer
#  course_section_id   :bigint
#  position            :integer          default(0), not null
#
require 'rails_helper'

RSpec.describe Lesson, type: :model do
  let(:lesson) { create(:lesson) }

  describe 'Associations' do
    it { is_expected.to belong_to(:language) }
    it { is_expected.to belong_to(:author) }
    it { is_expected.to belong_to(:support_language).optional }
    it { is_expected.to belong_to(:parent).optional }
    it { is_expected.to belong_to(:course_section).optional }

    it { is_expected.to have_many(:children) }
    it { is_expected.to have_many(:tasks) }
    it { is_expected.to have_many(:lesson_phrases) }
    it { is_expected.to have_many(:phrases) }
  end

  describe '#rating' do
    it 'has no div error by zero when rating_count is zero' do
      lesson.update(ratings_count: 0)
      expect(lesson.send(:rating)).to eq(0)
    end
  end

  describe '#phrases_count' do
    before do
      create(:lesson_phrase, lesson: lesson, phrase: create(:dictionary_word))
    end

    it 'increases when add lesson' do
      expect(lesson.phrases_count).to eq(1)
    end

    it 'decreases when destroy lesson' do
      lesson.phrases.last.destroy!
      expect(lesson.reload.phrases_count).to eq(0)
    end
  end
end
