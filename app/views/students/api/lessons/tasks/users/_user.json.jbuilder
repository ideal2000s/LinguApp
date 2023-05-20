# frozen_string_literal: true

json.extract! user, :id, :full_name
json.avatar_url user.avatar_url(:thumbnail)
