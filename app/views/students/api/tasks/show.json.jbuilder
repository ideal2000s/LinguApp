# frozen_string_literal: true

json.task do
  json.extract! task,
                :id,
                :lesson_id,
                :type,
                :subject,
                :audio_url,
                :cover_img
  json.image_url task.image_url(:cover)
  json.mobile_image_url task.image_url(:cover_mobile)
  json.giphy_image task.image_remote_link.present? ? JSON.parse(task.image_remote_link) : nil
  json.title task.name
  json.introduction task.introduction.to_s
  json.image do
    if task.image.present?
      json.width task.image.width
      json.height task.image.height
    else
      json.null!
    end
  end
  json.partial! task, as: :task, student: student, lesson: lesson
  json.url students_api_lesson_task_path(task.lesson_id, task.id)
end

json.lesson_phrases do
  json.array! lesson.phrases do |word|
    json.extract! word, :id, :body, :frequency
    json.word_translation word.translation(target: lesson.support_language&.code)
    json.image_url word.image&.url
    json.audio_url word.audio&.url
    json.animation_url word.animation&.url
    json.color_required word.color_required
    json.student_word do
      json.nil!
    end
  end
end
