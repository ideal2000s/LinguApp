# frozen_string_literal: true

module LessonsHelper
  def public_url(lesson)
    "https://lingu.com/lessons/#{lesson.id}"
  end

  def public_course_url(course)
    slug = I18n.with_locale(:en) { course.language.slug }
    "https://lingu.com/#{slug}/#{course.slug}"
  end
end
