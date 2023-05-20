# frozen_string_literal: true

json.assignments do
  json.array! assignments do |assignment|
    json.extract! assignment, :id, :team_id, :language_id, :name, :context, :instruction
  end
end
