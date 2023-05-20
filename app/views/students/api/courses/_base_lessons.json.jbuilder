# frozen_string_literal: true

json.extract! lesson,
              :id,
              :title,
              :average_duration,
              :phrases_count,
              :ratings_count,
              :total_rating,
              :image_url
json.partial! 'students/api/lessons/lesson_author', locals: { author: lesson.author }
