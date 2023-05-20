# frozen_string_literal: true

json.course do
  json.extract! course, :id, :title, :lessons_count, :rating, :sections_count, :slug, :level, :color
  json.image_url course.image_url(:large_banner)
  json.description course.description.to_s
  json.meta_description truncate(course.description.to_plain_text, length: 168)
  json.language_code course.language&.code
  json.partial! 'students/api/languages/catalog_language', locals: { language: course.language }
  json.words_count course.phrases_count
  json.estimated_time course.estimated_time.to_i
  json.course_sections course.course_sections.reject { |cs| cs.lessons.published.size.zero? },
                       partial: 'base_course_section',
                       as: :course_section
end
