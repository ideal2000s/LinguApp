# frozen_string_literal: true

json.student_target_language do
  json.extract! student_target_language,
                :id,
                :language_id,
                :level
  json.active student_target_language.active?
  json.url students_api_profile_student_target_language_path(student_target_language)
end
