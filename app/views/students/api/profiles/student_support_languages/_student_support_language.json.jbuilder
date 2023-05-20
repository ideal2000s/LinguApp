# frozen_string_literal: true

json.extract! student_support_language,
              :id,
              :language_id
json.native student_support_language.native?
json.url students_api_profile_student_support_language_path(student_support_language)
