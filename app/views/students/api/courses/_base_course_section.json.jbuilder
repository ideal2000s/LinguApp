# frozen_string_literal: true

json.extract! course_section, :id, :name
json.lessons course_section.base_lessons, partial: 'base_lessons', as: :lesson
