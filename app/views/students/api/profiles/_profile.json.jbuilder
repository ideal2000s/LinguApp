# frozen_string_literal: true

json.extract! student,
              :id,
              :email,
              :fname,
              :lname,
              :mobile,
              :ssn,
              :gender,
              :locale,
              :native_student_support_language_id,
              :native_locale,
              :active_student_target_language_id
json.native_language_id student.native_language&.id
json.student_target_languages student.student_target_languages do |student_target_language|
  json.extract! student_target_language,
                :id,
                :language_id,
                :level
  json.active student_target_language.active?
  json.url students_api_profile_student_target_language_path(student_target_language)
end
json.student_support_languages student.student_support_languages do |student_support_language|
  json.partial! 'students/api/profiles/student_support_languages/student_support_language',
                locals: { student_support_language: student_support_language }
end
json.avatar_url student.avatar(:thumbnail)&.url
json.valid student.valid?
json.active_licenses student.active_licenses.includes(:plan, :team) do |license|
  json.partial! 'students/api/licenses/license', locals: { license: license }
end
json.student_identities student.student_identities do |student_identity|
  json.partial! 'students/api/student_identities/student_identity', locals: { student_identity: student_identity }
end
