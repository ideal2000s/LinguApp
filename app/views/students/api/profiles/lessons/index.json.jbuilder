# frozen_string_literal: true

json.lessons lessons do |lesson|
  json.extract! lesson,
                :id,
                :title,
                :description,
                :language_code,
                :phrases_count,
                :average_duration,
                :level,
                :latest_earned_xp,
                :latest_progress_percent,
                :latest_duration
  json.image_url lesson.image_url(:card_image)
  json.partial! 'students/api/lessons/lesson_author', locals: { author: lesson.author }
end

json.extract! lessons, :current_page, :total_pages, :next_page, :prev_page, :limit_value, :total_count
