# frozen_string_literal: true

json.lesson do # rubocop:disable Metrics/BlockLength
  json.extract! lesson,
                :id,
                :title,
                :kind,
                :phrases_count,
                :level,
                :average_duration,
                :objectives
  json.image_url lesson.image_url(:large_banner)
  json.image do
    json.partial! 'students/api/shared/attachment_with_derivatives',
                  locals: { record: lesson, attachment_name: :image }
  end
  json.language_code lesson.language.code
  json.partial! 'students/api/languages/catalog_language', locals: { language: lesson.language }
  json.new_phrases_count lesson.phrases_count
  json.color lesson.frontend_color.presence
  json.subjects do
    subjects.each do |k, v|
      json.child! do
        json.subject k
        json.tasks(v) do |task|
          json.id task.id
          json.name task.name
        end
      end
    end
  end
  json.tasks_list lesson.tasks.pluck(:type).uniq
  json.team do
    json.extract! lesson.team, :id, :name, :status, :followers_count, :lessons_count, :meta
    json.image_url lesson.team.image&.url
    json.is_following is_following
  end
  json.partial! 'lesson_author', locals: { author: lesson.author }
  json.course do
    # TODO: Find better implementation of lesson-course relations
    course = lesson.course # TODO: .published
    if course
      lesson_ids = course.lessons.pluck(:id)
      json.title course.title
      json.course_id course.id
      json.course_path students_course_path(course)
      json.next_course_lesson_id lesson_ids.at(lesson_ids.index(lesson.id) + 1)
    else
      json.nil!
    end
  end
end
