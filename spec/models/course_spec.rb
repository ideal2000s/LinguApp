# frozen_string_literal: true

# == Schema Information
#
# Table name: courses
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  description    :string
#  image_data     :text
#  lessons_count  :integer          default(0), not null
#  rating         :float
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  discarded_at   :datetime
#  author_id      :integer
#  team_id        :integer
#  sections_count :integer          default(0)
#  language_id    :bigint
#  slug           :string
#  published      :boolean          default(FALSE), not null
#  level          :integer          default("undefined"), not null
#  meta           :jsonb            not null
#
require 'rails_helper'

RSpec.describe Course, type: :model do
  describe 'Model validations' do
    it { is_expected.to validate_presence_of(:language) }
    it { is_expected.to validate_presence_of(:title) }
  end

  describe 'Associations' do
    it { is_expected.to belong_to(:author) }
    it { is_expected.to belong_to(:language) }
    it { is_expected.to belong_to(:team) }
    it { is_expected.to have_many(:team_groups) }
    it { is_expected.to have_many(:course_sections) }
    it { is_expected.to have_many(:lessons).through(:course_sections) }
  end

  describe 'lessons_count' do
    let(:lesson) { create(:lesson) }
    let(:course_section) { create(:course_section) }
    let(:course) { course_section.course }

    it 'increases when lesson added' do
      expect do
        lesson.update!(course_section: course_section)
      end.to change { course.reload.lessons_count }.by(1)
    end

    it 'decreases when lesson removed' do
      lesson.update!(course_section: course_section)
      course.reload
      expect do
        lesson.update!(course_section: nil)
      end.to change { course.reload.lessons_count }.by(-1)
    end
  end
end
