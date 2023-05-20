# frozen_string_literal: true

json.items students do |student|
  json.extract! student, :id
  json.text "#{student.full_name} <#{student.email}>"
  json.url edit_admin_student_path(student)
end
