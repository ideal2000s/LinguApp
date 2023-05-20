# frozen_string_literal: true

if student && (license = student.active_licenses.joins(:plan).find_by(plans: { language_id: lesson.language_id }))
  json.partial!('task_team', team: license.team)
elsif lesson.team
  json.partial!('task_team', team: lesson.team)
else
  json.null!
end
