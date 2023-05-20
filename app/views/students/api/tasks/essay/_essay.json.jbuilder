# frozen_string_literal: true

json.items task.functional_items, :id, :type, :minimum_words
json.video_url task.video_url
json.reviewer do
  json.partial!('task_reviewer', lesson: lesson, task: task, student: current_student)
end
