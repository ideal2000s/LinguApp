# frozen_string_literal: true

json.profile do
  json.partial! 'students/api/profiles/profile', locals: { student: student }
end
json.authenticity_token authenticity_token
