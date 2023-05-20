# frozen_string_literal: true

json.extract! student, :id, :name
json.avatar_url student.avatar_url(:thumbnail)
