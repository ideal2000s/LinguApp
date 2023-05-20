# frozen_string_literal: true

# TODO: wrap all responses into named roots
# json.profile do
json.partial! 'students/api/profiles/profile', locals: { student: student }
# end
