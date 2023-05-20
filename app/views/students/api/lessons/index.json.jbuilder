# frozen_string_literal: true

json.lessons lessons do |lesson|
  json.extract! lesson,
                :id,
                :title,
                :description,
                :objectives,
                :kind,
                :language_code,
                :phrases_count,
                :level,
                :rating,
                :average_duration
  json.new_phrases_count lesson.phrases_count
  json.color lesson.frontend_color.presence
  json.image do
    json.partial! 'students/api/shared/attachment_with_derivatives',
                  locals: { record: lesson, attachment_name: :image }
  end
  json.image_url lesson.image_url(:card_image)
  json.partial! 'students/api/languages/catalog_language', locals: { language: lesson.language }
  json.partial! 'students/api/languages/support_language', locals: { language: lesson.support_language }
  json.partial! 'lesson_author', locals: { author: lesson.author }
end
json.extract! lessons, :current_page, :total_pages, :next_page, :prev_page, :limit_value, :total_count
