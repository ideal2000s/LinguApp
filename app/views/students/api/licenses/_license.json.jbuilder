# frozen_string_literal: true

json.extract! license,
              :team_student_id,
              :expires_at,
              :created_at,
              :updated_at
json.plan do
  json.partial! 'students/api/plans/plan', locals: { plan: license.plan }
end
json.team do
  json.partial! 'students/api/teams/team', locals: { team: license.team }
end
