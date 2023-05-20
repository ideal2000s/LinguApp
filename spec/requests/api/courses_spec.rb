# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Courses API', type: :request do
  let(:language) { create(:language) }
  let(:student) { create(:student) }
  let(:team) { create(:team) }
  let(:course) { create(:course, :published, language: language, team: team, author: team.owner, title: Faker::Lorem.sentence) }
  let(:lesson) { create(:lesson, :published) }

  describe 'get courses' do
    before do
      course.update(image: File.open(Rails.root.join('spec', 'fixtures', 'files', 'image.jpg')))
      sign_in(student, scope: :student)
      get '/api/courses'
    end

    specify 'succeeds' do
      expect(response.status).to eq(200)
    end

    specify 'it returns list of courses' do
      expect(json.courses.length).to eq(1)
    end

    specify 'it returns course' do
      expect(json.courses[0]).to have_attributes(
        id: course.id,
        title: course.title,
        lessons_count: course.lessons_count,
        rating: course.rating,
        slug: course.slug,
        image_url: course.image_url(:mobile_banner),
        language_code: course.language.code
      )
    end
  end

  describe 'get course' do
    before do
      course
      sign_in(student, scope: :student)
      get "/api/courses/#{course.id}"
    end

    specify 'succeeds' do
      expect(response.status).to eq(200)
    end

    specify 'it returns course' do
      expect(json.course).to have_attributes(
        id: course.id,
        title: course.title,
        lessons_count: course.lessons_count,
        rating: course.rating,
        sections_count: course.sections_count,
        slug: course.slug,
        image_url: course.image_url(:large_banner),
        language_code: course.language.code
      )
    end
  end

  describe 'get ratings of course' do
    before do
      lesson.update!(course_section: course_section)
      lesson_rating1
      lesson_rating2
      sign_in(student, scope: :student)
      get "/api/courses/#{course.id}/ratings"
    end

    let(:lesson_rating1) { create(:rating, lesson: lesson, student: student, rate: 3) }
    let(:lesson_rating2) { create(:rating, lesson: lesson, student: student, rate: 4) }
    let(:course_section) { create(:course_section, course: course) }

    specify 'succeeds' do
      expect(response.status).to eq(200)
    end

    specify 'it returns 2 ratings' do
      expect(json.ratings.length).to eq(2)
    end

    specify 'it returns first rating for course' do
      expect(json.ratings[0]).to have_attributes(
        id: lesson_rating2.id,
        rate: lesson_rating2.rate
      )
    end

    specify 'it returns second rating for course' do
      expect(json.ratings[1]).to have_attributes(
        id: lesson_rating1.id,
        rate: lesson_rating1.rate
      )
    end

    specify 'it returns total ratings count for course' do
      expect(json.total_count).to eq(2)
    end
  end
end
