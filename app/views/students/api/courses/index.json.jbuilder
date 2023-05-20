# frozen_string_literal: true

json.courses do
  json.array! courses do |course|
    json.extract! course, :id, :title, :description, :lessons_count, :rating, :sections_count, :slug, :image_url, :color, :level
    json.description course.description.to_plain_text
    json.image_url course.image_url(:mobile_banner)
    json.language_code course.language&.code
    json.word_count course.phrases_count
    json.color course.lessons.published.first&.frontend_color
    json.course_path students_course_path(course)
    json.estimated_time course.estimated_time.to_i
    json.partial! 'course_author', locals: { team: course.team }
    json.partial! 'students/api/languages/catalog_language', locals: { language: course.language }
    json.team do
      json.extract! course.team, :id, :name, :followers_count
      json.image_url course.team.image_url(:tiny)
    end
    json.words_count course.phrases_count
  end
end
json.extract! courses, :current_page, :total_pages, :next_page, :prev_page, :limit_value, :total_count
